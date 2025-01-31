import React from 'react';
import { Filter, FILTER } from '../../types';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { setPriceFilter } from '../../store/actions';

import styles from './ButtonsGroup.module.css';
import classNames from 'classnames';

const BUTTONS = [
  { filter: FILTER.CHEAP, text: 'САМЫЙ ДЕШЕВЫЙ' },
  { filter: FILTER.FAST, text: 'САМЫЙ БЫСТРЫЙ' },
  { filter: FILTER.OPTIMAL, text: 'ОПТИМАЛЬНЫЙ' },
];

export const ButtonsGroup = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { priceFilter } = useSelector((state: RootState) => state.data);

  const handleSelect = (filter: Filter) => {
    dispatch(setPriceFilter(filter));
  };

  return (
    <div className={styles.buttonGroup}>
      {BUTTONS.map((button) => (
        <button
          className={classNames(priceFilter === button.filter ? styles.buttonActive : styles.buttonFltr)}
          key={button.filter}
          onClick={() => handleSelect(button.filter)}
        >
          {button.text}
        </button>
      ))}
    </div>
  );
};
