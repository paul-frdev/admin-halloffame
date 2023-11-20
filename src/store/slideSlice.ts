import slideService from '../requests/slideService';
import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { SlideProps, SlideState } from '../types/store';

export const getAllSlides = createAsyncThunk('slides/get-slides', async (thunkAPI) => {
  try {
    return await slideService.getSlides();
  } catch (error) {
    console.log(error);
  }
});

export const getSlideById = createAsyncThunk<SlideProps[], string, { rejectValue: string }>('slide/get-slide', async (id, thunkAPI) => {
  try {
    return await slideService.getSlide(id);
  } catch (error) {
    console.log(error);
  }
});

export const createSlide = createAsyncThunk<string[], SlideProps, { rejectValue: string }>('slide/create-slide', async (blogData, thunkAPI) => {
  try {
    return await slideService.createSlide(blogData);
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const deleteSlideById = createAsyncThunk<string[], string, { rejectValue: string }>('brand/delete-article', async (id, thunkAPI) => {
  try {
    return await slideService.deleteSlide(id);
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const resetStateSlide = createAction('Reset_all');

const initialState: SlideState = {
  slides: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};
const slidesReducer = createSlice({
  name: 'slides',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAllSlides.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllSlides.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.slides = action.payload;
      })
      .addCase(getAllSlides.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getSlideById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSlideById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.slides = action.payload;
      })
      .addCase(getSlideById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createSlide.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createSlide.fulfilled, (state, action: any) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.slides = action.payload;
      })
      .addCase(createSlide.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteSlideById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteSlideById.fulfilled, (state, action: any) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(deleteSlideById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })

      .addCase(resetStateSlide, () => initialState);
  },
});

export default slidesReducer.reducer;
