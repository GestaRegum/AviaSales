import React from 'react';
import { FilterCheckbox, FILTER_CHECKBOXES } from '../../types';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { setFilters } from '../../store/actions';
import styles from './CheckboxesGroup.module.css';
import classNames from 'classnames';

const CHECKBOXES = [
  { filterCheckbox: FILTER_CHECKBOXES.ALL, text: 'Все' },
  { filterCheckbox: FILTER_CHECKBOXES.ONE, text: '1 Пересадка' },
  { filterCheckbox: FILTER_CHECKBOXES.TWO, text: '2 Пересадка' },
  { filterCheckbox: FILTER_CHECKBOXES.THREE, text: '3 Пересадка' },
];

export const CheckboxesGroup = () => {
  const dispatch = useDispatch<AppDispatch>();
  const selectedFilters = useSelector((state: RootState) => state.data.filters);

  const handleCheckboxChange = (filter: FilterCheckbox) => {
    if (filter === FILTER_CHECKBOXES.ALL) {
      if (selectedFilters.includes(FILTER_CHECKBOXES.ALL)) {
        dispatch(setFilters([]));
      } else {
        dispatch(setFilters([FILTER_CHECKBOXES.ALL]));
      }
    } else {
      const isFilterSelected = selectedFilters.includes(filter);
      const newFilters: FilterCheckbox[] = isFilterSelected
        ? (selectedFilters.filter((item) => item !== filter) as FilterCheckbox[])
        : ([...selectedFilters.filter((f) => f !== FILTER_CHECKBOXES.ALL), filter] as FilterCheckbox[]);

      dispatch(setFilters(newFilters.length > 0 ? newFilters : [FILTER_CHECKBOXES.ALL]));
    }
  };

  return (
    <div className={styles.checkboxList}>
      <p> Количество пересадок</p>
      {CHECKBOXES.map((checkbox) => (
        <div key={checkbox.filterCheckbox}>
          <label className={styles.check}>
            <span
              className={classNames(
                selectedFilters.includes(checkbox.filterCheckbox) ? styles.checkBoxChecked : styles.checkBox
              )}
            ></span>
            <input
              className={styles.checkInput}
              type="checkbox"
              checked={selectedFilters.includes(checkbox.filterCheckbox)}
              onChange={() => handleCheckboxChange(checkbox.filterCheckbox)}
            />

            {checkbox.text}
          </label>
        </div>
      ))}
    </div>
  );
};
