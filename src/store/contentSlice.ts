import contentService from '../requests/contentService';
import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { AboutUsProps, ContentState } from '../types/store';

export const getAboutUs = createAsyncThunk<AboutUsProps, string, { rejectValue: string }>('about/get-about', async (id, thunkAPI) => {
  try {
    return await contentService.getAbout(id);
  } catch (error) {
    console.log(error);
  }
});

export const createAbout = createAsyncThunk<AboutUsProps, AboutUsProps, { rejectValue: string }>('about/create-about', async (about, thunkAPI) => {
  try {
    return await contentService.createAboutUs(about);
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const updateAboutUs = createAsyncThunk<AboutUsProps, AboutUsProps, { rejectValue: string }>('about/update-about', async (about, thunkAPI) => {
  try {
    return await contentService.updateAbout(about);
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const resetStateContent = createAction('Reset_all');

const initialState: ContentState = {
  aboutUs: undefined,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};
const contentReducer = createSlice({
  name: 'content',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(createAbout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAbout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.aboutUs = action.payload;
      })
      .addCase(createAbout.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getAboutUs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAboutUs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.aboutUs = action.payload;
      })
      .addCase(getAboutUs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateAboutUs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAboutUs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.aboutUs = action.payload;
      })
      .addCase(updateAboutUs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetStateContent, () => initialState);
  },
});

export default contentReducer.reducer;
