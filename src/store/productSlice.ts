import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import productService from '../requests/productService';
import { ProductData, ProductState } from '../types/store';

export const getProducts = createAsyncThunk<undefined, undefined, { rejectValue: string }>('product/get-products', async (_, thunkAPI) => {
  try {
    return await productService.getProducts();
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const createProducts = createAsyncThunk<ProductData, ProductData, { rejectValue: string }>(
  'product/create-products',
  async (productData, thunkAPI) => {
    try {
      return await productService.createProduct(productData);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const resetState = createAction('Reset_all');

const initialState: ProductState = {
  products: [],
  createdProduct: [],
  updatedProduct: [],
  deletedProduct: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdProduct?.push(action.payload);
      })
      .addCase(createProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});
export default productSlice.reducer;
