import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import categoryService from '../requests/categoryService';
import { CategoriesData, CategoriesState } from '../types/store';

export const getCategories = createAsyncThunk('productCategory/get-categories', async (thunkAPI) => {
  try {
    return await categoryService.getCategories();
  } catch (error) {
    console.log(error);
  }
});
export const createCategory = createAsyncThunk<CategoriesData, CategoriesData, { rejectValue: string }>(
  'category/create-category',
  async (categoryData, thunkAPI) => {
    try {
      return await categoryService.createCategory(categoryData);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getCategory = createAsyncThunk<CategoriesData, string, { rejectValue: string }>('category/get-category', async (id, thunkAPI) => {
  try {
    return await categoryService.getCategory(id);
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});
export const updateCategory = createAsyncThunk<CategoriesData, CategoriesData, { rejectValue: string }>(
  'category/update-category',
  async (category, thunkAPI) => {
    try {
      return await categoryService.updateCategory(category);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteCategoryById = createAsyncThunk<string[], string, { rejectValue: string }>('category/delete-category', async (id, thunkAPI) => {
  try {
    return await categoryService.deleteCategory(id);
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const resetState = createAction('Reset_all');

const initialState: CategoriesState = {
  categories: [],
  createdCategory: [],
  updatedCategory: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.categories = action.payload;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedCategory?.push(action.payload);
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCategory.fulfilled, (state, action: any) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.categoryName = action.payload;
      })
      .addCase(getCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteCategoryById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCategoryById.fulfilled, (state, action: any) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedCategory = action.payload;
      })
      .addCase(deleteCategoryById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});
export default categorySlice.reducer;
