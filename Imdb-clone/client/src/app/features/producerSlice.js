import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/producers";

export const fetchProducers = createAsyncThunk(
  "producers/fetchProducers",
  async () => {
    const response = await axios.get(API_URL);
    return response.data;
  }
);

export const createProducer = createAsyncThunk(
  "producers/createProducer",
  async (producerData) => {
    const response = await axios.post(API_URL, producerData);
    return response.data;
  }
);

const producersSlice = createSlice({
  name: "producers",
  initialState: { producers: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducers.fulfilled, (state, action) => {
        state.producers = action.payload;
      })
      .addCase(createProducer.fulfilled, (state, action) => {
        state.producers.push(action.payload);
      });
  },
});

export default producersSlice.reducer;
