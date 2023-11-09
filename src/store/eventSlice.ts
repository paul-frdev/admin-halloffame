import eventService from '../requests/eventService';
import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { EventProps, EventState } from '../types/store';

export const getEvents = createAsyncThunk('event/get-events', async (thunkAPI) => {
  try {
    return await eventService.getEvents();
  } catch (error) {
    console.log(error);
  }
});

export const getEventById = createAsyncThunk<EventProps[], string, { rejectValue: string }>('event/get-event', async (id, thunkAPI) => {
  try {
    return await eventService.getEvent(id);
  } catch (error) {
    console.log(error);
  }
});

export const createEvent = createAsyncThunk<string[], EventProps, { rejectValue: string }>('event/create-event', async (EventData, thunkAPI) => {
  try {
    return await eventService.createEvent(EventData);
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const resetStateEvent = createAction('Reset_all');

const initialState: EventState = {
  eventsData: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};
const eventsReducer = createSlice({
  name: 'events',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getEvents.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEvents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.eventsData = action.payload;
      })
      .addCase(getEvents.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getEventById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEventById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.eventsData = action.payload;
      })
      .addCase(getEventById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createEvent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createEvent.fulfilled, (state, action: any) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.eventsData = action.payload;
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })

      .addCase(resetStateEvent, () => initialState);
  },
});

export default eventsReducer.reducer;
