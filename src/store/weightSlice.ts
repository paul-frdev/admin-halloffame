import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import weightService from '../requests/weightService';
import { WeightsData, WeightsState } from '../types/store';

export const getWeights = createAsyncThunk('weight/get-weights', async (thunkAPI) => {
  try {
    return await weightService.getWeights();
  } catch (error) {
    console.log(error);
  }
});
export const createWeight = createAsyncThunk<WeightsData, WeightsData, { rejectValue: string }>('weight/create-weight', async (weightData, thunkAPI) => {
  try {
    return await weightService.createWeight(weightData);
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const getWeight = createAsyncThunk<WeightsData, string, { rejectValue: string }>('weight/get-weight', async (id, thunkAPI) => {
  try {
    return await weightService.getWeight(id);
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});
export const updateWeight = createAsyncThunk<WeightsData, WeightsData, { rejectValue: string }>('weight/update-weight', async (weight, thunkAPI) => {
  try {
    return await weightService.updateWeight(weight);
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const deleteWeightById = createAsyncThunk<string[], string, { rejectValue: string }>('weight/delete-weight', async (id, thunkAPI) => {
  try {
    return await weightService.deleteWeight(id);
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const resetState = createAction('Reset_all');

const initialState: WeightsState = {
  weights: [],
  createdWeight: [],
  updatedWeight: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};

const weightSlice = createSlice({
  name: 'weights',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getWeights.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getWeights.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.weights = action.payload;
      })
      .addCase(getWeights.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createWeight.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createWeight.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdWeight?.push(action.payload);
      })
      .addCase(createWeight.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateWeight.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateWeight.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedWeight?.push(action.payload);
      })
      .addCase(updateWeight.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getWeight.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getWeight.fulfilled, (state, action: any) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.weightName = action.payload;
      })
      .addCase(getWeight.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteWeightById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteWeightById.fulfilled, (state, action: any) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedWeight = action.payload;
      })
      .addCase(deleteWeightById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});
export default weightSlice.reducer;
