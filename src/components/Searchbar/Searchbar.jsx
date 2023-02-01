import { Component } from 'react';
import { HiSearch } from 'react-icons/hi';
import { toast } from 'react-toastify';

import PropTypes from 'prop-types';
import css from './Searchbar.module.css';

export class Searchbar extends Component {
  state = {
    searchData: '',
  };

  handleSearchInputChange = e => {
    this.setState({
      searchData: e.currentTarget.value.toLowerCase()
    });
  };

  handleSubmit = e => {
    e.preventDefault(); 

    if (this.state.searchData.trim() === '') {
      return toast.info('Your query is empty, please enter data to search.');
    };

    this.props.onSubmit(this.state.searchData);
    this.setState({ searchData: '' });
  }

  render() {
    return(
      <header className={css.searchbar}>
        <form onSubmit={this.handleSubmit} className={css.searchForm}>
          <button type="submit" className={css.searchFormBtn}>
            <HiSearch style={{ width: 24, height: 24 }} />
            <span className={css.searchFormBtnLabel}>Search</span>
          </button>

          <input
            className={css.searchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.searchData}
            onChange={this.handleSearchInputChange}
          />
        </form>
      </header>
    )
  }  
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};