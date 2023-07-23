import {combineReducers} from '@reduxjs/toolkit';
import movieSlice from './slices/movieSlice';

const rootReducer = combineReducers({
  movie: movieSlice,
});

export default rootReducer;
