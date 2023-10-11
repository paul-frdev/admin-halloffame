import { configureStore } from '@reduxjs/toolkit';
import blogCategoryReducer from './blogCategorySlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import articlesReducer from './ArticleSlice';
import uploadImageReducer from './uploadImageSlice';

export const store = configureStore({
  reducer: {
    blogCategory: blogCategoryReducer,
    articles: articlesReducer,
    uploadImages: uploadImageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
