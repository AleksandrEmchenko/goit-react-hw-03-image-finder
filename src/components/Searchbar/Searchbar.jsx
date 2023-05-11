import React from "react";
// import styles from './searcbar.css';
// import PropTypes from 'prop-types';

class Searchbar extends React.Component {

  render() {
    return (
      <header className="searchbar">
        <form className="form">
          <button tyepe="submit" className="button">
            <span className="button-label">Search</span>
          </button>

          <input
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            
          />
        </form>
      </header>
    );
  }
}

// Searchbar.propTypes = propTypes;
// Searchbar.defaultProps = defaultProps;
// #endregion

export default Searchbar;
