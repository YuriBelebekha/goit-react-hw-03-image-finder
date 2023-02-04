import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import { Searchbar } from './Searchbar';
import 'react-toastify/dist/ReactToastify.css';
import { getRandomHexColor } from 'utils/getRandomHexColor';
import { ImageGallery } from './ImageGallery';

export class App extends Component {
  state = {
    searchQuery: '',    
  };

  handleSearchFormSubmit = searchQuery => {
    this.setState({ searchQuery });
  }; 

  render() {
    return (
      <>
        <div style={{ backgroundColor: getRandomHexColor() }}>
          <Searchbar onSubmit={this.handleSearchFormSubmit} />
        </div>

        <ImageGallery searchQuery={this.state.searchQuery} />

        <ToastContainer
          autoClose={3000}
          position="top-center"
          pauseOnFocusLoss
        />
      </>
    );
  }
};
