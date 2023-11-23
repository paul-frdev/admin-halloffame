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

export const deleteSlideById = createAsyncThunk<string[], string, { rejectValue: string }>('slide/delete-slide', async (id, thunkAPI) => {
  try {
    return await slideService.deleteSlide(id);
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const updateIsActiveSlide = createAsyncThunk<string[], string, { rejectValue: string }>('slide/update-active-slide', async (id, thunkAPI) => {
  try {
    return await slideService.updateIsActiveSlide(id);
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const updateSlide = createAsyncThunk<SlideProps, SlideProps, { rejectValue: string }>('slide/update-slide', async (slide, thunkAPI) => {
  try {
    return await slideService.updateSlide(slide);
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
      .addCase(updateIsActiveSlide.fulfilled, (state, action: any) => {
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(updateIsActiveSlide.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateSlide.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateSlide.fulfilled, (state, action: any) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(updateSlide.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })

      .addCase(resetStateSlide, () => initialState);
  },
});

export default slidesReducer.reducer;
