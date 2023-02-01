import React, { Component } from 'react';

// import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';


export class ImageGalleryItem extends Component {
  state = {
    
  };

  render() {
    return (
      <li className={css.galleryItem}>
        <img src="" alt="" />
      </li>
    )
  }
}