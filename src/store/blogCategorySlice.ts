import BlogCategoryService from '../requests/blogCatService';
import { BlogCategoriesState, BlogCategoryState } from '../types/store';
import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';

export const getCategories = createAsyncThunk('blog-category/get-categories', async () => {
  try {
    const response = await BlogCategoryService.getBlogCategories();

    return response;
  } catch (error: any) {
    console.log(error);
  }
});

export const createNewBlogCategory = createAsyncThunk<string[], BlogCategoryState, { rejectValue: string }>(
  'blog-category/create-category',
  async (catData, thunkAPI) => {
    try {
      return await BlogCategoryService.createBlogCategory(catData);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(`Failed to add blog category ${error}`);
    }
  }
);

export const deleteBlogCategoryById = createAsyncThunk<string[], string, { rejectValue: string }>(
  'blog-category/delete-category',
  async (id, thunkAPI) => {
    try {
      return await BlogCategoryService.deleteBlogCategory(id);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateCategory = createAsyncThunk<BlogCategoryState, BlogCategoryState, { rejectValue: string }>(
  'blog-category/update-category',
  async (category, thunkAPI) => {
    try {
      return await BlogCategoryService.updateBlogCategory(category);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetStateBlogCategory = createAction('Reset_all');

const initialState: BlogCategoriesState = {
  bCategories: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};

const blogCategoryReducer = createSlice({
  name: 'blog-category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCategories.fulfilled, (state, action: any) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.bCategories = action.payload;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createNewBlogCategory.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(createNewBlogCategory.fulfilled, (state, action: any) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.bCategories = action.payload;
      })
      .addCase(createNewBlogCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteBlogCategoryById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBlogCategoryById.fulfilled, (state, action: any) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(deleteBlogCategoryById.rejected, (state, action) => {
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
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetStateBlogCategory, () => initialState);
  },
});

export default blogCategoryReducer.reducer;
