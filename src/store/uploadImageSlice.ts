import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import uploadService from '../requests/uploadService';
import { ImageProps, ImageUrls } from '../types/store';

export const uploadImg = createAsyncThunk<ImageUrls[], any, { rejectValue: string }>('upload/images', async (data, thunkAPI) => {
  try {
    const formData = new FormData();
    for (let i = 0; i < data.length; i++) {
      formData.append('images', data[i]);
    }
    return await uploadService.uploadImage(formData);
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const deleteImg = createAsyncThunk<string, string | undefined, { rejectValue: string }>('delete/images', async (id, thunkAPI) => {
  try {
    return await uploadService.deleteImage(id);
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const getImage = createAsyncThunk<ImageUrls[], string, { rejectValue: string }>('get/image', async (id, thunkAPI) => {

  try {
    return await uploadService.getImageById(id);
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const resetStateImages = createAction('Reset_all');

const initialState: ImageProps = {
  images: [],
  updatedImage: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};

const uploadImageSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(uploadImg.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(uploadImg.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.images = action.payload;
      })
      .addCase(uploadImg.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getImage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getImage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.images = action.payload;
      })
      .addCase(getImage.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteImg.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteImg.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.images = state.images.filter((img: any) => img.public_id !== action.meta.arg);
      })
      .addCase(deleteImg.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(resetStateImages, () => initialState);
  },
});

export default uploadImageSlice.reducer;
