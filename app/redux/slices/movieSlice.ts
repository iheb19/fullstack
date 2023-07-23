import {createSlice} from '@reduxjs/toolkit';
import { Movie } from '../../domain/models/movie';

interface MovieState {
  list: Movie[];
  listFavourite: Movie[];
}

const initialState: MovieState = {
  list: [],
  listFavourite: [],
};

const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    setList: (state, action) => {
      state.list = action.payload;
    },
    addToFavourite: (state, action) => {
      const movieToAdd = action.payload;
      state.listFavourite.push(movieToAdd);
    },
    removeFromFavorites: (state, action) => {
      const movieIdToRemove = action.payload;
      state.listFavourite = state.listFavourite.filter(
        movie => movie.id !== movieIdToRemove,
      );
    },
  },
});

export const {setList, addToFavourite, removeFromFavorites} =
  movieSlice.actions;

export default movieSlice.reducer;
