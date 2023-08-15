import React, { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import styles from './styles.module.scss';

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <React.Fragment>
      <Navbar />
      <main className={styles.app}>{children}</main>
      <Footer />
    </React.Fragment>
  );
};

export default Layout;
