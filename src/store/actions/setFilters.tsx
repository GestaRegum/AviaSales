import { FILTER_CHECKBOXES } from '../../types';

export const setFilters = (payload: (keyof typeof FILTER_CHECKBOXES)[]) => ({
  type: 'data/setFilters',
  payload,
});
