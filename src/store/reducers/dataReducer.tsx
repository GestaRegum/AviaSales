import { createSlice } from '@reduxjs/toolkit';
import { getSearchId, getTickets } from '../actions';
import { DataState, FILTER } from '../../types';

const initialState: DataState = {
  searchId: '',
  tickets: [],
  loading: false,
  stop: false,
  error: null,
  filters: ['ALL'],
  visibleTicketsCount: 5,
  priceFilter: FILTER.CHEAP,
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
    increaseVisibleTickets: (state) => {
      state.visibleTicketsCount += 5;
    },
    setPriceFilter: (state, action) => {
      state.priceFilter = action.payload;
      state.visibleTicketsCount = 5;
    },
    setStop: (state, action) => {
      state.stop = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSearchId.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSearchId.fulfilled, (state, action) => {
        state.loading = false;
        state.searchId = action.payload;
      })
      .addCase(getSearchId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getTickets.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTickets.fulfilled, (state, action) => {
        state.tickets = [...state.tickets, ...action.payload.tickets];
        state.loading = false;

        if (action.payload.stop) {
          state.stop = true;
        }
      })
      .addCase(getTickets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const reducer = dataSlice.reducer;
