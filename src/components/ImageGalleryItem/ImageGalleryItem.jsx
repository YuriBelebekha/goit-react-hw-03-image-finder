import { Component } from 'react';
import { Modal } from '../Modal';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export class ImageGalleryItem extends Component {
  state = {
    shownModal: false,
  };
  
  onClickImageModal = () => {
    this.setState(({ shownModal }) => ({ shownModal: !shownModal }));
  };
  
  render() {    
    const { webformatURL, tags, largeImageURL } = this.props.image;       
    const { shownModal } = this.state;    

    return (
      <li className={css.GalleryItem}>
        <img
          className={css.GalleryItemImage}
          onClick={this.onClickImageModal}
          src={webformatURL}
          alt={tags}          
        />

        {shownModal &&
          <Modal
            onClose={this.onClickImageModal}
            largeImageURL={largeImageURL}
            tags={tags}
          />          
        }        
      </li>
    );
  };
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string,
  tags: PropTypes.string,
  largeImageUrl: PropTypes.string,
};