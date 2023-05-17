import React from "react";
import css from "./App.module.css";
import { ToastContainer, toast } from "react-toastify";
import Searchbar from "./Searchbar";
import ImageGallery from "./ImageGallery";
import Button from "./Button";
import { searchFunc } from "./Services/API";
import Loader from "./Loader";

let page = 1;
export class App extends React.Component {
  state = {
    query: "",
    items: [],
    status: "idle",
    totalHith: 0,
  };

  handleFormSubmit = async (query) => {
    page = 1;
    if (query.trim() === "") {
      toast.warn("Enter a search term!!!");
      alert("Enter a search term!!!");
      return;
    } else {
      try {
        this.setState({ status: "pending" });
        const { totalHits, hits } = await searchFunc(query, page);
        if (hits.length < 1) {
          this.setState({ status: "idle" });
          toast.warn(
            "There are no images matching your request. Please try again."
          );
          alert("There are no images matching your request. Please try again.");
        } else {
          this.setState({
            items: hits,
            query,
            totalHits: totalHits,
            status: "resolved",
          });
        }
      } catch (error) {
        this.setState({ status: "rejected" });
        toast.error("Something went wrong, please try again later");
        alert("Something went wrong, please try again later");
      }
    }
  };

  onNextPage = async () => {
    this.setState({ status: "pending" });

    try {
      const { hits } = await searchFunc(this.state.query, (page += 1));
      this.setState((prevState) => ({
        status: "resolved",
        items: [...prevState.items, ...hits],
      }));
    } catch (error) {
      this.setState({ status: "rejected" });
    }
  };

  render() {
    const { totalHits, items, status } = this.state;
    if (status === "idle") {
      return (
        <div className={css.App}>
          <Searchbar onSubmit={this.handleFormSubmit} />
          <span>Enter a search term!!!</span>
        </div>
      );
    }
    if (status === "pending") {
      return (
        <div className={css.App}>
          <Searchbar onSubmit={this.handleFormSubmit} />
          <ImageGallery page={page} items={this.state.items} />
          <Loader />
          {totalHits > 12 && <Button onClick={this.onNextPage} />}
        </div>
      );
    }
    if (status === "rejected") {
      return (
        <div className={css.App}>
          <Searchbar onSubmit={this.handleFormSubmit} />
        </div>
      );
    }
    if (status === "resolved") {
      return (
        <div className={css.App}>
          <Searchbar onSubmit={this.handleFormSubmit} />
          <ImageGallery page={page} items={this.state.items} />
          {totalHits > 100 && totalHits > items.length && (
            <Button onClick={this.onNextPage} />
          )}
          <ToastContainer autoClose={2000} />
        </div>
      );
    }
  }
}
