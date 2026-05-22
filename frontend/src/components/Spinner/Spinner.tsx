'use client';

import React from 'react';
import styles from './Spinner.module.css';

export const Spinner = () => {
  return (
    <div className={styles.spinnerWrapper}>
      <div className={styles.spinner}></div>
    </div>
  );
};
