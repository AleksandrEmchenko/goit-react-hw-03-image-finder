import React from "react";
// import styled from 'styled-components';
// import PropTypes from 'prop-types';
import Searchbar from "./Searchbar";


export class App extends React.Component {

  state = {
    key: "b238492e38b83f6eacf1dd9bd",
    query: "",
  };

handleFormSubmit(event){
  event.preventDefault();

}

  render() {
    // const KEY_URL = "b238492e38b83f6eacf1dd9bd";


    return (
      <div>
        <Searchbar />
      </div>
    );
  }
}

// App.propTypes = propTypes;
// App.defaultProps = defaultProps;

export default App;
