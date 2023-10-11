import { createBlogCategory, getBlogCategories } from '../requests/blogCategory';
import { BlogCategoriesState, BlogCategoryState } from '../types/store';
import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';

export const getCategories = createAsyncThunk('blog-category/get-categories', async () => {
  try {
    const response = await getBlogCategories();

    return response;
  } catch (error: any) {
    console.log(error);
  }
});

export const createNewBlogCategory = createAsyncThunk<string[], BlogCategoryState, { rejectValue: string }>(
  'blog-category/create-category',
  async (catData, thunkAPI) => {
    try {
      return await createBlogCategory(catData);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(`Failed to add blog category ${error}`);
    }
  }
);

export const resetState = createAction('Reset_all');

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
      .addCase(resetState, () => initialState);
  },
});

export default blogCategoryReducer.reducer;
