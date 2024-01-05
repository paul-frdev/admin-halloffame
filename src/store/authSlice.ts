import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AuthState, AuthUser, User } from '../types/store';
import authService from '../requests/authService';

const getUserFromLocalStorage = localStorage.getItem('user') ? JSON.parse(JSON.stringify(localStorage.getItem('user'))) : null;

export const login = createAsyncThunk<User, string, { rejectValue: string }>('auth/login', async (userData, thunkAPI) => {
  try {
    return await authService.login(userData);
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const authorize = createAsyncThunk<any>('auth/authorize', async (_, thunkAPI) => {
  try {
    const response = await authService.authorize();

    return response;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});

const initialState: AuthState = {
  user: getUserFromLocalStorage,
  authCurUser: undefined,
  isError: false,
  isLoading: false,
  isSuccess: false,
  isAuth: false,
  message: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.message = 'success';
      })
      .addCase(login.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
      .addCase(authorize.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(authorize.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.authCurUser = action.payload;
        state.message = 'success';
      })
      .addCase(authorize.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
        state.isAuth = false;
      });
  },
});

export default authSlice.reducer;
