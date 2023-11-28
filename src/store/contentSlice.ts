import contentService from '../requests/contentService';
import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { AboutUsProps, ContactsProps, ContentState, RefundProps } from '../types/store';

export const getAboutUs = createAsyncThunk<AboutUsProps, string, { rejectValue: string }>('about/get-about', async (id, thunkAPI) => {
  try {
    return await contentService.getAbout(id);
  } catch (error) {
    console.log(error);
  }
});

export const getCurAbout = createAsyncThunk('about/get-cur-about', async (thunkAPI) => {
  try {
    return await contentService.getAboutUs();
  } catch (error) {
    console.log(error);
  }
});

export const createAbout = createAsyncThunk<AboutUsProps, AboutUsProps, { rejectValue: string }>('about/create-about', async (about, thunkAPI) => {
  try {
    return await contentService.createAboutUs(about);
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const updateAboutUs = createAsyncThunk<AboutUsProps, AboutUsProps, { rejectValue: string }>('about/update-about', async (about, thunkAPI) => {
  try {
    return await contentService.updateAbout(about);
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});

// TODO contacts calls
export const getContactId = createAsyncThunk<ContactsProps, string, { rejectValue: string }>('contact/get-contact', async (id, thunkAPI) => {
  try {
    return await contentService.getContactId(id);
  } catch (error) {
    console.log(error);
  }
});

export const getContacts = createAsyncThunk('contact/get-cur-contact', async (thunkAPI) => {
  try {
    return await contentService.getContacts();
  } catch (error) {
    console.log(error);
  }
});

export const createContact = createAsyncThunk<ContactsProps, ContactsProps, { rejectValue: string }>(
  'contact/create-contact',
  async (contact, thunkAPI) => {
    try {
      return await contentService.createContact(contact);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateContact = createAsyncThunk<ContactsProps, ContactsProps, { rejectValue: string }>(
  'contact/update-contact',
  async (contact, thunkAPI) => {
    try {
      return await contentService.updateContacts(contact);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// TODO refund calls
export const getRefundId = createAsyncThunk<RefundProps, string, { rejectValue: string }>('refund/get-refund', async (id, thunkAPI) => {
  try {
    return await contentService.getRefundId(id);
  } catch (error) {
    console.log(error);
  }
});

export const getRefund = createAsyncThunk('refund/get-cur-refund', async (thunkAPI) => {
  try {
    return await contentService.getRefund();
  } catch (error) {
    console.log(error);
  }
});

export const createRefund = createAsyncThunk<RefundProps, RefundProps, { rejectValue: string }>('refund/create-refund', async (refund, thunkAPI) => {
  try {
    return await contentService.createRefund(refund);
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const updateRefund = createAsyncThunk<RefundProps, RefundProps, { rejectValue: string }>('refund/update-refund', async (refund, thunkAPI) => {
  try {
    return await contentService.updateRefund(refund);
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const resetStateContent = createAction('Reset_all');

const initialState: ContentState = {
  aboutUs: undefined,
  contacts: undefined,
  refund: undefined,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};
const contentReducer = createSlice({
  name: 'content',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(createAbout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAbout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.aboutUs = action.payload;
      })
      .addCase(createAbout.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getAboutUs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAboutUs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.aboutUs = action.payload;
      })
      .addCase(getAboutUs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getCurAbout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCurAbout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.aboutUs = action.payload;
      })
      .addCase(getCurAbout.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateAboutUs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAboutUs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.aboutUs = action.payload;
      })
      .addCase(updateAboutUs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(createContact.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.contacts = action.payload;
      })
      .addCase(createContact.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getContactId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getContactId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.contacts = action.payload;
      })
      .addCase(getContactId.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getContacts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.contacts = action.payload;
      })
      .addCase(getContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateContact.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.contacts = action.payload;
      })
      .addCase(updateContact.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(createRefund.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createRefund.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.refund = action.payload;
      })
      .addCase(createRefund.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getRefundId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRefundId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.refund = action.payload;
      })
      .addCase(getRefundId.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getRefund.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRefund.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.refund = action.payload;
      })
      .addCase(getRefund.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateRefund.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateRefund.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.refund = action.payload;
      })
      .addCase(updateRefund.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(resetStateContent, () => initialState);
  },
});

export default contentReducer.reducer;
