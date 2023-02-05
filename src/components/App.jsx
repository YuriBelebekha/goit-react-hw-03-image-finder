import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import { Searchbar } from './Searchbar';
import 'react-toastify/dist/ReactToastify.css';
import { getRandomHexColor } from 'utils/getRandomHexColor';
import { ImageGallery } from './ImageGallery';
import css from './App.module.css';

export class App extends Component {
  state = {
    searchQuery: '',    
  };

  handleSearchFormSubmit = searchQuery => {
    this.setState({ searchQuery });
  }; 

  render() {
    return (
      <div className={css.App}>
        <div style={{ backgroundColor: getRandomHexColor() }}>
          <Searchbar onSubmit={this.handleSearchFormSubmit} />
        </div>

        <ImageGallery searchQuery={this.state.searchQuery} />

        <ToastContainer
          autoClose={3000} // changed to 3000 after dev
          limit={3}          
          pauseOnFocusLoss
        />
      </div>
    );
  };
};
