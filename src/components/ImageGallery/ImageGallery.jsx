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
    error: null,
    photo: [],
    totalHits: 0,
    page: 1,    
    status: Status.IDLE,
  };
  
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchQuery !== this.props.searchQuery) {
      this.setState({ status: Status.PENDING });

      pixabayApi
        .fetchPixabayPhoto(this.props.searchQuery)
        .then(photo => this.setState({ photo }))
        .catch(error => this.setState({ error }))      
    };
    
    console.log(this.state.photo.hits);
  };

  render() {
    return(
      <ul className={css.imageGallery}>      
        <ImageGalleryItem searchQuery={this.props.searchQuery} />
      </ul>
    )
  }  
};

// ImageGallery.propTypes = {

// };
