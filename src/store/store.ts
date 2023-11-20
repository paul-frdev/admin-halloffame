import { configureStore } from '@reduxjs/toolkit';
import blogCategoryReducer from './blogCategorySlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import articlesReducer from './articleSlice';
import uploadImageReducer from './uploadImageSlice';
import colorsReducer from './colorSlice';
import sizesReducer from './sizeSlice';
import weightsReducer from './weightSlice';
import categorySlice from './categorySlice';
import brandSlice from './brandSlice';
import productSlice from './productSlice';
import eventSlice from './eventSlice';
import ticketSlice from './ticketSlice';
import sliceSlice from './slideSlice';

export const store = configureStore({
  reducer: {
    blogCategory: blogCategoryReducer,
    articles: articlesReducer,
    uploadImages: uploadImageReducer,
    colors: colorsReducer,
    sizes: sizesReducer,
    weights: weightsReducer,
    categories: categorySlice,
    brands: brandSlice,
    products: productSlice,
    events: eventSlice,
    tickets: ticketSlice,
    slides: sliceSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
