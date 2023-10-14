import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import colorService from '../requests/colorService';
import { ColorsData, ColorsState } from '../types/store';

export const getColors = createAsyncThunk('color/get-colors', async (thunkAPI) => {
  try {
    return await colorService.getColors();
  } catch (error) {
    console.log(error);
  }
});
export const createColor = createAsyncThunk<ColorsData, ColorsData, { rejectValue: string }>('color/create-color', async (colorData, thunkAPI) => {
  try {
    return await colorService.createColor(colorData);
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const getAColor = createAsyncThunk<ColorsData, string, { rejectValue: string }>('color/get-color', async (id, thunkAPI) => {
  try {
    return await colorService.getColor(id);
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});
export const updateColor = createAsyncThunk<ColorsData, ColorsData, { rejectValue: string }>('color/update-color', async (color, thunkAPI) => {
  try {
    return await colorService.updateColor(color);
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const deleteAColorById = createAsyncThunk<string[], string, { rejectValue: string }>('color/delete-color', async (id, thunkAPI) => {
  try {
    return await colorService.deleteColor(id);
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const resetState = createAction('Reset_all');

const initialState: ColorsState = {
  colors: [],
  createdColor: [],
  updatedColor: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};

const colorSlice = createSlice({
  name: 'colors',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getColors.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getColors.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.colors = action.payload;
      })
      .addCase(getColors.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createColor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createColor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdColor?.push(action.payload);
      })
      .addCase(createColor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateColor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateColor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedColor?.push(action.payload);
      })
      .addCase(updateColor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getAColor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAColor.fulfilled, (state, action: any) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.colorName = action.payload;
      })
      .addCase(getAColor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteAColorById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAColorById.fulfilled, (state, action: any) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedColor = action.payload;
      })
      .addCase(deleteAColorById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});
export default colorSlice.reducer;
