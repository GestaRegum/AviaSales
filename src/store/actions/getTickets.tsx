import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchTickets } from "../../API";
import axios from "axios";

export const getTickets = createAsyncThunk(
    'tickets/getTickets',
    async (searchId: string, { dispatch, rejectWithValue }) => {
      try {
        const response = await fetchTickets(searchId);
  
        if (response.status !== 200) {
          throw new Error(`${response.status}`);
        }
  
        if (response.data.stop) {
          return response.data;
        }
  
        dispatch(getTickets(searchId));
  
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 500) {
            console.warn('Ошибка 500. Повторяем запрос.');
            await dispatch(getTickets(searchId));
            return rejectWithValue('Ошибка сервера. Попробуем снова.');
          }
  
          return rejectWithValue(error.message || 'Неизвестная ошибка');
        }
  
        return rejectWithValue(error instanceof Error ? error.message : 'Неизвестная ошибка');
      }
    }
  );
  