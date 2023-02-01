import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import { Searchbar } from './Searchbar';
import 'react-toastify/dist/ReactToastify.css';
import { getRandomHexColor } from 'utils/getRandomHexColor';
import { ImageGallery } from './ImageGallery';

export class App extends Component {
  state = {
    searchData: '',
  };

  handleSearchFormSubmit = searchData => {
    this.setState({ searchData });
  }; 

  render() {
    return (
      <>
        <div style={{ backgroundColor: getRandomHexColor() }}>
          <Searchbar onSubmit={this.handleSearchFormSubmit} />
        </div>

        <ImageGallery />

        <ToastContainer
          autoClose={3000}
          position="top-center"
          pauseOnFocusLoss
        />
      </>
    );
  }
};
