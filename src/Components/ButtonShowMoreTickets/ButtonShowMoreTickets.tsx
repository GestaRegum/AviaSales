import { increaseVisibleTickets } from '../../store/actions';
import React, { FC } from 'react';
import styles from './ButtonShowMoreTickets.module.css';

import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';

export const ButtonShowMoreTickets: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleShowMoreTickets = () => {
    dispatch(increaseVisibleTickets());
  };

  return (
    <button className={styles.buttonShow5} onClick={handleShowMoreTickets}>
      Показать еще 5
    </button>
  );
};
