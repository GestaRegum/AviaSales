import { configureStore } from '@reduxjs/toolkit';
import { reducer } from './reducers/dataReducer';
import { fetchTickets } from '../API/API';

export const store = configureStore({
  reducer: {
    data: reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: fetchTickets,
      },
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
