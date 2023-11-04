import ticketService from '../requests/ticketService';
import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { TicketProps, TicketState } from '../types/store';

export const getTickets = createAsyncThunk('ticket/get-tickets', async (thunkAPI) => {
  try {
    return await ticketService.getTickets();
  } catch (error) {
    console.log(error);
  }
});

export const getTicketById = createAsyncThunk<TicketProps[], string, { rejectValue: string }>('ticket/get-ticket', async (id, thunkAPI) => {
  try {
    return await ticketService.getTicket(id);
  } catch (error) {
    console.log(error);
  }
});

export const createTicket = createAsyncThunk<string[], TicketProps, { rejectValue: string }>('ticket/create-ticket', async (data, thunkAPI) => {
  try {
    return await ticketService.createTicket(data);
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const deleteTicketById = createAsyncThunk<string[], string, { rejectValue: string }>('size/delete-ticket', async (id, thunkAPI) => {
  try {
    return await ticketService.deleteTicket(id);
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const resetState = createAction('Reset_all');

const initialState: TicketState = {
  tickets: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};
const ticketsReducer = createSlice({
  name: 'tickets',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getTickets.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTickets.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.tickets = action.payload;
      })
      .addCase(getTickets.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getTicketById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTicketById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.tickets = action.payload;
      })
      .addCase(getTicketById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createTicket.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTicket.fulfilled, (state, action: any) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.tickets = action.payload;
      })
      .addCase(createTicket.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteTicketById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTicketById.fulfilled, (state, action: any) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(deleteTicketById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })

      .addCase(resetState, () => initialState);
  },
});

export default ticketsReducer.reducer;
