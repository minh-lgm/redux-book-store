import {
  GET_BOOKS,
  SET_LOADING,
  BOOKS_ERROR,
  GET_BOOK_DETAIL,
  ADD_TO_READING_LIST,
  REMOVE_FROM_READING_LIST,
  GET_READING_LIST,
  SET_CURRENT_PAGE,
  SET_SEARCH_QUERY
} from '../types';
import api from '../../apiService';
import { toast } from 'react-toastify';

// Get books with pagination and search
export const getBooks = (page, limit, query) => async dispatch => {
  try {
    console.log('getBooks action called with:', { page, limit, query });
    dispatch(setLoading());
    
    let url = `/books?_page=${page}&_limit=${limit}`;
    if (query) url += `&q=${query}`;
    
    console.log('Fetching books from URL:', url);
    const res = await api.get(url);
    console.log('Books API response:', res);
    
    dispatch({
      type: GET_BOOKS,
      payload: res.data
    });
  } catch (error) {
    console.error('Error fetching books:', error);
    dispatch({
      type: BOOKS_ERROR,
      payload: error.message || 'Error fetching books'
    });
    toast.error(error.message || 'Error fetching books');
  }
};

// Get book details
export const getBookDetail = (bookId) => async dispatch => {
  try {
    dispatch(setLoading());
    
    const res = await api.get(`/books/${bookId}`);
    
    dispatch({
      type: GET_BOOK_DETAIL,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: BOOKS_ERROR,
      payload: error.message
    });
    toast.error(error.message);
  }
};

// Get reading list
export const getReadingList = () => async dispatch => {
  try {
    dispatch(setLoading());
    
    const res = await api.get('/favorites');
    
    dispatch({
      type: GET_READING_LIST,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: BOOKS_ERROR,
      payload: error.message
    });
    toast.error(error.message);
  }
};

// Add book to reading list
export const addToReadingList = (book) => async dispatch => {
  try {
    dispatch(setLoading());
    
    await api.post('/favorites', book);
    
    dispatch({
      type: ADD_TO_READING_LIST,
      payload: book
    });
    
    toast.success('The book has been added to the reading list!');
  } catch (error) {
    dispatch({
      type: BOOKS_ERROR,
      payload: error.message
    });
    toast.error(error.message);
  }
};

// Remove book from reading list
export const removeFromReadingList = (bookId) => async dispatch => {
  try {
    dispatch(setLoading());
    
    await api.delete(`/favorites/${bookId}`);
    
    dispatch({
      type: REMOVE_FROM_READING_LIST,
      payload: bookId
    });
    
    toast.success('The book has been removed from the reading list!');
  } catch (error) {
    dispatch({
      type: BOOKS_ERROR,
      payload: error.message
    });
    toast.error(error.message);
  }
};

// Set loading state
export const setLoading = () => {
  return {
    type: SET_LOADING
  };
};

// Set current page
export const setCurrentPage = (pageNum) => {
  return {
    type: SET_CURRENT_PAGE,
    payload: pageNum
  };
};

// Set search query
export const setSearchQuery = (query) => {
  return {
    type: SET_SEARCH_QUERY,
    payload: query
  };
};
