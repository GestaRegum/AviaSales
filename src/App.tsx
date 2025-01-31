import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Empty, Spin } from 'antd';
import { AppDispatch, RootState } from './store';
import { getSearchId, getTickets, increaseVisibleTickets } from './store/actions';
import { Ticket } from './types';
import styles from './App.module.css';

import { TicketCard } from './Components/TicketCard';

import { useVisibleTickets, useFilteredTickets } from './hooks/';

import { CheckboxesGroup } from './Components/CheckboxesGroup';
import { ButtonsGroup } from './Components/ButtonsGroup';
import { useInView } from 'react-intersection-observer';

export function App() {
  const dispatch = useDispatch<AppDispatch>();
  const filteredTickets = useFilteredTickets();
  const visibleTickets = useVisibleTickets();
  const { searchId, loading, stop } = useSelector((state: RootState) => state.data);

  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView) {
      dispatch(increaseVisibleTickets());
    }
  }, [inView]);
  useEffect(() => {
    dispatch(getSearchId());
  }, [dispatch]);

  useEffect(() => {
    if (!stop) {
      dispatch(getTickets(searchId));
    }
  }, [searchId, stop]);

  return (
    <div className={styles.ticketListConteiner}>
      <CheckboxesGroup />

      <div className={styles.ticketList}>
        <ButtonsGroup />

        <div className={styles.overflow}>
          {filteredTickets.length === 0 ? (
            <div className={styles.ticketNo}>
              Рейсов, подходящих под заданные фильтры, не найдено
              <Empty />
            </div>
          ) : (
            visibleTickets.map((ticket: Ticket, index: number) => (
              <div key={ticket.segments[0].date + ticket.segments[1].date}>
                <TicketCard ticket={ticket} />
                {index === visibleTickets.length - 1 ? <div ref={ref} /> : null}
              </div>
            ))
          )}
        </div>

        {loading ? <Spin /> : null}
      </div>
    </div>
  );
}
