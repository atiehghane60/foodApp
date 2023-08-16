// libraries
import React from 'react';
import { Link } from 'react-router-dom';
// assets and styles
import styles from './styles.module.scss';

const NotFound = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Oops! Page Not Found</h1>
      <h4 className={styles.subtitle} >404</h4>
      <p className={styles.message}>
        We're sorry, but the page you are looking for can't be found...
      </p>
      <Link to="/" className={styles['home-link']}>
        Go back to Home
      </Link>
    </div>
  );
};

export default NotFound;
