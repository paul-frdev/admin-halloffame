import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
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

const initialState: ImageProps = {
  images: [],
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
      });
  },
});

export default uploadImageSlice.reducer;
