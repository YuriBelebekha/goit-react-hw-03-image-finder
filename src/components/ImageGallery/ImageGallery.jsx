import { ImageGalleryItem } from "components/ImageGalleryItem";
import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';

export function ImageGallery({ images }) {
  return (
    <ul className={css.ImageGallery}>
      {images.map(image => (
        <ImageGalleryItem
          key={image.id}
          image={image}
        />
      ))}
    </ul>
  )
};

ImageGallery.propTypes = {
  images: PropTypes.array,
};













// import { Component } from 'react';
// import pixabayApi from 'services/pixabay-api';
// import { per_page } from 'services/pixabay-api';
// import { toast } from 'react-toastify';

// import { ImageGalleryItem } from '../ImageGalleryItem';
// import { Loader } from '../Loader';
// import { Button } from '../Button';

// import PropTypes from 'prop-types';
// import css from './ImageGallery.module.css';


// export class ImageGallery extends Component {
//   state = {
//     images: [],
//     totalHits: 0,
//     page: 1,
//     // per_page: null,
//     isLoading: false,
//     loadMore: false,
//     // error: null,    
//   };

//   componentDidUpdate(prevProps, prevState) {
//     if (this.props.searchQuery.trim() === '') {
//       return toast.info('Your query is empty, please enter data to search.');
//     };

//     if (prevProps.searchQuery !== this.props.searchQuery || prevState.page !== this.state.page) {
      
//       pixabayApi
//         .fetchPixabayPhoto(this.props.searchQuery, this.state.page)
//         .then((images) => {          
//           if (images.totalHits > 0) {            
//             this.setState({                           
//               images,
//               isLoading: false,
//             });            
//             toast.success(`Hooray! We found ${images.totalHits} images`);
//           };

//           console.log('images.length', images.length)
//           console.log('images.totalHits', images.totalHits)
//           console.log('images.hits.length', images.hits.length)
//           console.log('per_page', per_page)
//           if (images.totalHits > per_page && (per_page - 1) < images.hits.length) {
//             this.setState({
//               // images: [...prevState.images, ...images.hits],
//               loadMore: true
//             });             
//           };

//           if (images.totalHits === 0) {
//             toast.warning('Sorry, there are no images matching your search query.');
//             this.setState({ images: [] });
//           };
//         })
//         .catch((error) => {
//           if (error) {
//             toast.error(`Something went wrong... ${error.message}`);
//           };
//         })
//         .finally(
//           this.setState({
//             isLoading: true,
//             loadMore: false
//           })
//         );
//     };    
//   };  

//   onloadMore = () => {
//     this.setState(prevState => ({ page: prevState.page + 1 }));
//     console.log(this.state.page)
//   };

//   render() {
//     const { hits } = this.state.images;
//     const { isLoading, loadMore } = this.state;    

//     if (hits) {      
//       return (
//         <>
//           { isLoading && <Loader /> }
//           <ul className={css.ImageGallery}>            
//             { hits.map(({ id, webformatURL, tags }) => (
//               <ImageGalleryItem
//                 key={id}
//                 webformatURL={webformatURL}
//                 tags={tags}
//               />
//             ))}          
//           </ul>
//           { loadMore && <Button onloadMore={this.onloadMore} onClick={this.onloadMore} /> }
//         </>
//       )          
//     };
//   };
// };

// ImageGallery.propTypes = {
//   key: PropTypes.number,
//   webformatURL: PropTypes.string,
//   tags: PropTypes.string,
// };
