// src/features/moviesSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchMovies = createAsyncThunk("movies/fetchMovies", async () => {
  const response = await axios.get("/api/movies");
  return response.data;
});

// Add other CRUD operations similarly

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [],
    status: null,
  },
  reducers: {
    // Define reducers for adding, updating, and deleting movies
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
  },
});

export default moviesSlice.reducer;
