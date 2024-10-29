import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/actors";

export const fetchActors = createAsyncThunk("actors/fetchActors", async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

export const createActor = createAsyncThunk(
  "actors/createActor",
  async (actorData) => {
    const response = await axios.post(API_URL, actorData);
    return response.data;
  }
);

const actorsSlice = createSlice({
  name: "actors",
  initialState: { actors: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchActors.fulfilled, (state, action) => {
        state.actors = action.payload;
      })
      .addCase(createActor.fulfilled, (state, action) => {
        state.actors.push(action.payload);
      });
  },
});

export default actorsSlice.reducer;
