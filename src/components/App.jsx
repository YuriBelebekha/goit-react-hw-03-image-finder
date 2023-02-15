import React, { Component } from 'react';
import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { Button } from './Button';
import { Loader } from './Loader';
import { ToastContainer, toast, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { animateScroll as scroll } from 'react-scroll';
import { getRandomHexColor } from 'utils/getRandomHexColor';
import pixabayApi, { per_page } from 'services/pixabay-api';
import css from './App.module.css';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

const ToastOptions = {
  autoClose: 2000,
  pauseOnFocusLoss: true,
  transition: Flip,
};

let page = 1;

export class App extends Component {
  state = {
    searchQuery: '',
    images: [],    
    totalHits: 0,
    status: Status.IDLE,
    error: null,
  };

  handleSearchFormSubmit = async searchQuery => {
    page = 1;

    if (searchQuery.trim() === '') {
      return toast.info('Your query is empty, please enter data to search.', ToastOptions);
    };
    
    try {      
      const { totalHits, hits } = await pixabayApi.fetchPixabayPhoto(searchQuery, page);
        
      if (hits.length === 0) {
        this.setState({ status: Status.IDLE });
        toast.warning('Sorry, there are no images matching your search query.', ToastOptions);
      }

      if (hits.length > 0) {        
        this.setState({
          searchQuery,
          images: hits,
          totalHits,
          status: Status.RESOLVED,
        });
        
        setTimeout(() => {
          const { images } = this.state;
          toast.success(`Total ${totalHits} / Displayed ${images.length}`, ToastOptions);
        }, 100);        
      };      
    } catch (error) {
      if (error.message.length < 25) {
        toast.error(`Something went wrong... Details: ${error.message}`, ToastOptions);
      } else {
        this.setState({ error, status: Status.REJECTED });
      };
    };
  };

  onloadMore = async () => {
    this.setState({ status: Status.PENDING });

    try {
      const { searchQuery, totalHits } = this.state;
      const { hits } = await pixabayApi.fetchPixabayPhoto(searchQuery, (page += 1));
      
      this.setState(prevState => ({        
        images: [...prevState.images, ...hits],
        status: Status.RESOLVED,
      }));

      this.scrollGalleryOnLoadMoreBtn();
      
      setTimeout(() => {
        const { images } = this.state;
        toast.success(`Total ${totalHits} / Displayed ${images.length}`, ToastOptions);
      }, 100);
    } catch (error) {
      this.setState({ status: Status.REJECTED });
    }
  };

  scrollGalleryOnLoadMoreBtn = () => {
    scroll.scrollToBottom();
  };

  render() {
    const { status, error, images, totalHits } = this.state;

    // PENDING
    if (status === 'idle') {
      return (
        <div className={css.App}>
          <div className={css.SearchbarBox} style={{ backgroundColor: getRandomHexColor() }}>
            <Searchbar onSubmit={this.handleSearchFormSubmit} />
          </div>

          <ToastContainer />
        </div>
      )
    };    

    // PENDING
    if (status === 'pending') {
      return (
        <div className={css.App}>
          <div className={css.SearchbarBox} style={{ backgroundColor: getRandomHexColor() }}>
            <Searchbar onSubmit={this.handleSearchFormSubmit} />
          </div>

          <ImageGallery            
            images={images}
            page={page}
          />

          <Loader />

          {totalHits > per_page && <Button onloadMore={this.onloadMore} />}
          
          <ToastContainer />
        </div>
      )
    };    
    
    // RESOLVED
    if (status === 'resolved') {
      return (
        <div className={css.App}>
          <div className={css.SearchbarBox} style={{ backgroundColor: getRandomHexColor() }}>
            <Searchbar onSubmit={this.handleSearchFormSubmit} />
          </div>

          <ImageGallery
            images={images}
            page={page}
          />

          {totalHits > per_page && totalHits > images.length && (
            <Button onloadMore={this.onloadMore} />
          )}         
          
          <ToastContainer />
        </div>
      )
    };
    
    // REJECTED
    if (status === 'rejected') {
      return (
        <div className={css.App}>
          <div className={css.SearchbarBox} style={{ backgroundColor: getRandomHexColor() }}>
            <Searchbar onSubmit={this.handleSearchFormSubmit} />
          </div>

          <div className={css.ErrorMessage}>
            <p>{`${error}. Please try again later.`}</p>            
          </div>

          <ToastContainer />
        </div>
      )
    };
  }
}