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

const initialState = {
  books: [],
  book: null,
  readingList: [],
  loading: false,
  error: null,
  currentPage: 1,
  searchQuery: '',
  totalPages: 10,
  limit: 10
};

const bookReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BOOKS:
      return {
        ...state,
        books: action.payload,
        loading: false
      };
    case GET_BOOK_DETAIL:
      return {
        ...state,
        book: action.payload,
        loading: false
      };
    case GET_READING_LIST:
      return {
        ...state,
        readingList: action.payload,
        loading: false
      };
    case ADD_TO_READING_LIST:
      return {
        ...state,
        readingList: [...state.readingList, action.payload],
        loading: false
      };
    case REMOVE_FROM_READING_LIST:
      return {
        ...state,
        readingList: state.readingList.filter(book => book.id !== action.payload),
        loading: false
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true
      };
    case BOOKS_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload
      };
    case SET_SEARCH_QUERY:
      return {
        ...state,
        searchQuery: action.payload,
        currentPage: 1 // Reset to first page when searching
      };
    default:
      return state;
  }
};

export default bookReducer;
