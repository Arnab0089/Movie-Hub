import { configureStore } from '@reduxjs/toolkit';
import movieReducer from './movieSlice'; // ✅ Import the default reducer

export const store = configureStore({
  reducer: {
    movieData: movieReducer, // ✅ Use the reducer function here
  },
});
