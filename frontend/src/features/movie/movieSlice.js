import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieService from "./movieService";

const initialState = {
  movies: [],
  series: [],
  cast: [],
  recommendations: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Get Popular Movies
export const getData = createAsyncThunk(
  "movie/getData",
  async (api_url, thunkAPI) => {
    try {
      return await movieService.getData(api_url);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);
// Get Popular Movies
export const getSeriesData = createAsyncThunk(
  "movie/getSeriesData",
  async (api_url, thunkAPI) => {
    try {
      return await movieService.getData(api_url);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get Popular Movies
export const getCast = createAsyncThunk(
  "movie/getCast",
  async (api_url, thunkAPI) => {
    try {
      return await movieService.getData(api_url);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get Popular Movies
export const getRecommendations = createAsyncThunk(
  "movie/getRecommendations",
  async (api_url, thunkAPI) => {
    try {
      return await movieService.getData(api_url);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    reset: (state) =>
      (state = {
        movies: [],
        series: [],
        cast: [],
        recommendations: [],
        isError: false,
        isSuccess: false,
        isLoading: false,
        message: "",
      }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(getData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        console.log(action.payload);
        state.movies = action.payload;
      })
      .addCase(getData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.movies = [];
      })
      .addCase(getSeriesData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSeriesData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        console.log(action.payload);
        state.series = action.payload;
      })
      .addCase(getSeriesData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.series = [];
      })
      .addCase(getCast.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCast.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.cast = action.payload;
      })
      .addCase(getCast.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.cast = [];
      })
      .addCase(getRecommendations.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRecommendations.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        console.log(action.payload);
        state.recommendations = action.payload;
      })
      .addCase(getRecommendations.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.movies = [];
      })
  },
});

export const { reset } = movieSlice.actions;
export default movieSlice.reducer;
