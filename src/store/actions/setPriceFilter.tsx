import { FILTER } from '../../types';

export const setPriceFilter = (payload: keyof typeof FILTER) => ({
  type: 'data/setPriceFilter',
  payload,
});
