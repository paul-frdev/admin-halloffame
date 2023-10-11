import articleService from '../requests/ArticleService';
import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { ArticleProps, ArticlesState } from '../types/store';

export const createArticle = createAsyncThunk<string[], ArticleProps, { rejectValue: string }>(
  'article/create-article',
  async (blogData, thunkAPI) => {
    try {
      return await articleService.createArticle(blogData);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction('Reset_all');

const initialState: ArticlesState = {
  articles: [],
  articleImages: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};
const articlesReducer = createSlice({
  name: 'articles',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(createArticle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createArticle.fulfilled, (state, action: any) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.articles = action.payload;
      })
      .addCase(createArticle.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })

      .addCase(resetState, () => initialState);
  },
});

export default articlesReducer.reducer;
