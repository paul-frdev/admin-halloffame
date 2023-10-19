import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import productService from '../requests/productService';
import { ProductData, ProductState } from '../types/store';

export const getProducts = createAsyncThunk('product/get-product', async (thunkAPI) => {
  try {
    return await productService.getProducts();
  } catch (error: any) {
    console.log(error);
  }
});

export const createProduct = createAsyncThunk<ProductData, ProductData, { rejectValue: string }>(
  'product/create-product',
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
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdProduct?.push(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});
export default productSlice.reducer;
