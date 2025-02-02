import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchSearchId } from '../../API';

export const getSearchId = createAsyncThunk('search/getSearchId', async () => {
  const response = await fetchSearchId();
  return response.data.searchId;
});
