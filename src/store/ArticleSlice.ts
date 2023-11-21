import articleService from '../requests/articleService';
import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { ArticleProps, ArticlesState } from '../types/store';

export const getBlogArticles = createAsyncThunk('article/get-blog-articles', async (thunkAPI) => {
  try {
    return await articleService.getBlogArticles();
  } catch (error) {
    console.log(error);
  }
});

export const getMediaArticles = createAsyncThunk('article/get-media-articles', async (thunkAPI) => {
  try {
    return await articleService.getMediaArticles();
  } catch (error) {
    console.log(error);
  }
});

export const getArticleById = createAsyncThunk<ArticleProps, string, { rejectValue: string }>('article/get-article', async (id, thunkAPI) => {
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

export const deleteArticleById = createAsyncThunk<string[], string, { rejectValue: string }>('brand/delete-article', async (id, thunkAPI) => {
  try {
    return await articleService.deleteArticle(id);
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const resetStateArticle = createAction('Reset_all');

const initialState: ArticlesState = {
  articles: [],
  article: undefined,
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
      .addCase(getBlogArticles.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBlogArticles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.articles = action.payload;
      })
      .addCase(getBlogArticles.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getMediaArticles.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMediaArticles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.articles = action.payload;
      })
      .addCase(getMediaArticles.rejected, (state, action) => {
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
        state.article = action.payload;
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
      .addCase(deleteArticleById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteArticleById.fulfilled, (state, action: any) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(deleteArticleById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })

      .addCase(resetStateArticle, () => initialState);
  },
});

export default articlesReducer.reducer;
