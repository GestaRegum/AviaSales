export interface Segment {
  origin: string;
  destination: string;
  date: string;
  stops: string[];
  duration: number;
}

export interface Ticket {
  price: number;
  carrier: string;
  segments: [Segment, Segment];
}

export interface TicketCardType {
  ticket: Ticket;
}

export interface DataState {
  searchId: string;
  tickets: Ticket[];
  loading: boolean;
  stop: boolean;
  error: string | null | undefined;
  filters: string[];
  visibleTicketsCount: number;
  priceFilter: Filter;
}

export const FILTER_CHECKBOXES = {
  ALL: 'ALL',
  ONE: 'ONE',
  TWO: 'TWO',
  THREE: 'THREE',
} as const;

export const FILTER = {
  CHEAP: 'CHEAP',
  FAST: 'FAST',
  OPTIMAL: 'OPTIMAL',
} as const;

export type FilterCheckbox = keyof typeof FILTER_CHECKBOXES;

export type Filter = keyof typeof FILTER;
