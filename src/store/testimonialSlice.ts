import testimonialService from '../requests/testimonialService';
import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { TestimonialProps, TestimonialState } from '../types/store';

export const getTestimonials = createAsyncThunk('testimonial/get-testimonials', async (thunkAPI) => {
  try {
    return await testimonialService.getTestimonials();
  } catch (error) {
    console.log(error);
  }
});

export const getTestimonial = createAsyncThunk<TestimonialProps, string, { rejectValue: string }>(
  'testimonial/get-testimonial',
  async (id, thunkAPI) => {
    try {
      return await testimonialService.getTestimonial(id);
    } catch (error) {
      console.log(error);
    }
  }
);

export const createTestimonial = createAsyncThunk<string[], TestimonialProps, { rejectValue: string }>(
  'testimonial/create-testimonial',
  async (testimonial, thunkAPI) => {
    try {
      return await testimonialService.createTestimonial(testimonial);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteTestimonialById = createAsyncThunk<string[], string, { rejectValue: string }>(
  'testimonial/delete-testimonial',
  async (id, thunkAPI) => {
    try {
      return await testimonialService.deleteTestimonial(id);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetStateTestimonial = createAction('Reset_all');

const initialState: TestimonialState = {
  testimonials: [],
  testimonial: undefined,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};
const testimonialsReducer = createSlice({
  name: 'testimonials',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getTestimonials.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTestimonials.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.testimonials = action.payload;
      })
      .addCase(getTestimonials.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getTestimonial.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTestimonial.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.testimonial = action.payload;
      })
      .addCase(getTestimonial.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createTestimonial.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTestimonial.fulfilled, (state, action: any) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.testimonials = action.payload;
      })
      .addCase(createTestimonial.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteTestimonialById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTestimonialById.fulfilled, (state, action: any) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(deleteTestimonialById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })

      .addCase(resetStateTestimonial, () => initialState);
  },
});

export default testimonialsReducer.reducer;
