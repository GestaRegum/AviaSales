import React from 'react';
import styles from './Header.module.css';

import HeaderIcon from '../../img/Header.svg?react';

export const Header = () => {
  return (
    <header className={styles.header}>
      <HeaderIcon />
    </header>
  );
};
