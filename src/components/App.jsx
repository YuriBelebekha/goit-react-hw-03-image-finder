import React, { Component } from 'react';
import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { Button } from './Button';
import { ToastContainer, toast, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  autoClose: 1000,
  pauseOnFocusLoss: true,
  transition: Flip,
};

let page = 1;

export class App extends Component {
  state = {
    searchQuery: '',
    images: [],
    // page: 0,
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
        page: prevState.page + 1,
        images: [...prevState.images, ...hits],
        status: Status.RESOLVED,
      }));
      
      setTimeout(() => {
        const { images } = this.state;
        toast.success(`Total ${totalHits} / Displayed ${images.length}`, ToastOptions);
      }, 100);
    } catch (error) {
      this.setState({ status: Status.REJECTED });
    }
  };




  // ADDED SCROLL TO BUTTON




  render() {
    const { status, error, images, totalHits } = this.state;

    if (status === 'idle') {
      return (
        <div className={css.App}>
          <div style={{ backgroundColor: getRandomHexColor() }}>
            <Searchbar onSubmit={this.handleSearchFormSubmit} />
          </div>

          <ToastContainer />
        </div>
      )
    };    

    if (status === 'pending') {
      return (
        <div className={css.App}>
          <div style={{ backgroundColor: getRandomHexColor() }}>
            <Searchbar onSubmit={this.handleSearchFormSubmit} />
          </div>

          <ImageGallery            
            images={images}
            page={page}
          />

          {totalHits > per_page && <Button onloadMore={this.onloadMore} />}
          
          <ToastContainer />
        </div>
      )
    };    
    
    if (status === 'resolved') {
      return (
        <div className={css.App}>
          <div style={{ backgroundColor: getRandomHexColor() }}>
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
    
    if (status === 'rejected') {
      return (
        <div className={css.App}>
          <div style={{ backgroundColor: getRandomHexColor() }}>
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





// import React, { Component } from 'react';
// import { ToastContainer } from 'react-toastify';
// import { Searchbar } from './Searchbar';
// import 'react-toastify/dist/ReactToastify.css';
// import { getRandomHexColor } from 'utils/getRandomHexColor';
// import { ImageGallery } from './ImageGallery';
// import css from './App.module.css';

// export class App extends Component {
//   state = {
//     searchQuery: '',    
//   };

//   handleSearchFormSubmit = searchQuery => {
//     this.setState({searchQuery});    
//   };

//   onloadMore = () => {
//     this.setState(prevState => ({ page: prevState.page + 1 }));
//   };

//   render() {
//     return (
//       <div className={css.App}>
//         <div style={{ backgroundColor: getRandomHexColor() }}>
//           <Searchbar onSubmit={this.handleSearchFormSubmit} />
//         </div>       

//         <ImageGallery searchQuery={this.state.searchQuery} />        

//         <ToastContainer
//           autoClose={1000}
//           limit={3}          
//           pauseOnFocusLoss
//         />
//       </div>
//     );
//   };
// };
