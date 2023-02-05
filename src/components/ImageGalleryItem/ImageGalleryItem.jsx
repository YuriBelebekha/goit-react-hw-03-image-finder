import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ webformatURL, tags }) => {
  return (
    <li className={css.GalleryItem}>
      <img
        src={webformatURL}
        alt={tags}
        className={css.GalleryItemImage} />
    </li>
  )
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};