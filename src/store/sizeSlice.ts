import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import sizeService from '../requests/sizeService';
import { SizesData, SizesState } from '../types/store';

export const getSizes = createAsyncThunk('size/get-sizes', async (thunkAPI) => {
  try {
    return await sizeService.getSizes();
  } catch (error) {
    console.log(error);
  }
});
export const createSize = createAsyncThunk<SizesData, SizesData, { rejectValue: string }>('size/create-size', async (sizeData, thunkAPI) => {
  try {
    return await sizeService.createSize(sizeData);
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const getSize = createAsyncThunk<SizesData, string, { rejectValue: string }>('size/get-size', async (id, thunkAPI) => {
  try {
    return await sizeService.getSize(id);
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});
export const updateSize = createAsyncThunk<SizesData, SizesData, { rejectValue: string }>('size/update-size', async (size, thunkAPI) => {
  try {
    return await sizeService.updateSize(size);
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const deleteSizeById = createAsyncThunk<string[], string, { rejectValue: string }>('size/delete-size', async (id, thunkAPI) => {
  try {
    return await sizeService.deleteSize(id);
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const resetState = createAction('Reset_all');

const initialState: SizesState = {
  sizes: [],
  createdSize: [],
  updatedSize: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};

const sizeSlice = createSlice({
  name: 'sizes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSizes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSizes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.sizes = action.payload;
      })
      .addCase(getSizes.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createSize.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createSize.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdSize?.push(action.payload);
      })
      .addCase(createSize.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateSize.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateSize.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedSize?.push(action.payload);
      })
      .addCase(updateSize.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getSize.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSize.fulfilled, (state, action: any) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.sizeName = action.payload;
      })
      .addCase(getSize.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteSizeById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteSizeById.fulfilled, (state, action: any) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedSize = action.payload;
      })
      .addCase(deleteSizeById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});
export default sizeSlice.reducer;
