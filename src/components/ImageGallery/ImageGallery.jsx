import { Component } from 'react';
import pixabayApi from 'services/pixabay-api';

import { ImageGalleryItem } from '../ImageGalleryItem';

// import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
}

export class ImageGallery extends Component {
  state = {    
    photo: [],
    totalHits: 0,
    page: 1,
    error: null,
    status: Status.IDLE,
  };
  
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchQuery !== this.props.searchQuery) {
      this.setState({ status: Status.PENDING });

      pixabayApi
        .fetchPixabayPhoto(this.props.searchQuery)
        .then(photo => this.setState({ photo: photo }))
        .catch(error => this.setState({ error }))      
    };    
  };

  render() {
    const { hits } = this.state.photo;    

    if (hits) {
      return (
        <ul className={css.imageGallery}>
          {hits.map(({ id, webformatURL, tags }) => (
            <ImageGalleryItem
              key={id}
              webformatURL={webformatURL}
              tags={tags}
            />
          ))}          
        </ul>
      )
    }    
  }  
};

// ImageGallery.propTypes = {

// };
