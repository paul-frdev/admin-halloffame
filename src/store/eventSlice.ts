import articleService from '../requests/articleService';
import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { ArticleProps, ArticlesState } from '../types/store';

export const getArticles = createAsyncThunk('article/get-articles', async (thunkAPI) => {
  try {
    return await articleService.getArticles();
  } catch (error) {
    console.log(error);
  }
});

export const getArticleById = createAsyncThunk<ArticleProps[], string, { rejectValue: string }>('article/get-article', async (id, thunkAPI) => {
  try {
    return await articleService.getArticle(id);
  } catch (error) {
    console.log(error);
  }
});

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
const eventsReducer = createSlice({
  name: 'articles',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getArticles.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getArticles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.articles = action.payload;
      })
      .addCase(getArticles.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getArticleById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getArticleById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.articles = action.payload;
      })
      .addCase(getArticleById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
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

export default eventsReducer.reducer;
