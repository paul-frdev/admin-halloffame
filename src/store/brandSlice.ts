import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import brandService from '../requests/brandService';
import { BrandsState, BrandsData } from '../types/store';

export const getBrands = createAsyncThunk('brand/get-brands', async (thunkAPI) => {
  try {
    return await brandService.getBrands();
  } catch (error) {
    console.log(error);
  }
});
export const createBrand = createAsyncThunk<BrandsData, BrandsData, { rejectValue: string }>('brand/create-brand', async (brandData, thunkAPI) => {
  try {
    return await brandService.createBrand(brandData);
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const getBrand = createAsyncThunk<BrandsData, string, { rejectValue: string }>('brand/get-brand', async (id, thunkAPI) => {
  try {
    return await brandService.getBrand(id);
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});
export const updateBrand = createAsyncThunk<BrandsData, BrandsData, { rejectValue: string }>('brand/update-brand', async (brand, thunkAPI) => {
  try {
    return await brandService.updateBrand(brand);
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const deleteBrandById = createAsyncThunk<string[], string, { rejectValue: string }>('brand/delete-brand', async (id, thunkAPI) => {
  try {
    return await brandService.deleteBrand(id);
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const resetState = createAction('Reset_all');

const initialState: BrandsState = {
  brands: [],
  createdBrand: [],
  updatedBrand: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};

const brandSlice = createSlice({
  name: 'brands',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBrands.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBrands.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.brands = action.payload;
      })
      .addCase(getBrands.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createBrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdBrand?.push(action.payload);
      })
      .addCase(createBrand.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateBrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedBrand?.push(action.payload);
      })
      .addCase(updateBrand.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getBrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBrand.fulfilled, (state, action: any) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.brandName = action.payload;
      })
      .addCase(getBrand.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteBrandById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBrandById.fulfilled, (state, action: any) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedBrand = action.payload;
      })
      .addCase(deleteBrandById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});
export default brandSlice.reducer;
