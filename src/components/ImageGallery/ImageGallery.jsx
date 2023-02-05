import { Component } from 'react';
import pixabayApi from 'services/pixabay-api';
import { toast } from 'react-toastify';

import { ImageGalleryItem } from '../ImageGalleryItem';
// import { Loader } from '../Loader';

import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';



export class ImageGallery extends Component {
  state = {    
    images: [],
    // totalHits: 0,
    page: 1,

    // isLoading: false,

    // error: null,    
  };  

  componentDidUpdate(prevProps, prevState) {
    if (this.props.searchQuery.trim() === '') {      
      return toast.info('Your query is empty, please enter data to search.');      
    };

    if (prevProps.searchQuery !== this.props.searchQuery) {
      pixabayApi
        .fetchPixabayPhoto(this.props.searchQuery)
        .then((images) => {
          if (images.totalHits === 0) {
            toast.warning('Sorry, there are no images matching your search query.');
            this.setState({ images: [] });
          };

          if (images.totalHits > 0) {
            this.setState({ images });
            toast.success(`Hooray! We found ${images.totalHits} images`);
            // this.setState({ isLoading: true }); 
          };
        })
        .catch((error) => {
          if (error) { toast.error(`Something went wrong... ${error.message}`) };
        })
        // .finally(
        //   this.setState({ isLoading: false })
        // );      
    };    
  };

  render() {
    const { hits } = this.state.images;
    // const { isLoading } = this.state;
    
    // if (isLoading) {
    //         <Loader />
    //       } 

    if (hits) {      
      return (
        <ul className={css.ImageGallery}>          
          {hits.map(({ id, webformatURL, tags }) => (
            <ImageGalleryItem
              key={id}
              webformatURL={webformatURL}
              tags={tags}
            />
          ))}          
        </ul>
      )          
    };
  };
};

ImageGallery.propTypes = {
  key: PropTypes.number,
  webformatURL: PropTypes.string,
  tags: PropTypes.string,
};
