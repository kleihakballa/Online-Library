import React from "react";
import { Link, NavLink } from "react-router-dom";
import styles from '../../styles/Navbar.module.css';

const Navbar = ({ signOut, user }) => {
  return (
      <nav className={styles.navbar}>
        <div className={styles.container}>
          <div className={styles['navbar-left']}>
            <Link className={styles['navbar-brand']} to="/">
              Library
            </Link>
            <ul className={styles['navbar-nav']}>
              <li className={styles['nav-item']}>
                <NavLink className={styles['nav-link']} exact to="/">
                  Home
                </NavLink>
              </li>
              <li className={styles['nav-item']}>
                <NavLink className={styles['nav-link']} exact to="/about">
                  About
                </NavLink>
              </li>
              <li className={styles['nav-item']}>
                <NavLink className={styles['nav-link']} exact to="/contact">
                  Contact
                </NavLink>
              </li>
              {user && (
                  <li className={styles['nav-item']}>
                    <Link className={styles['nav-link']} to="/profile">
                      My Profile
                    </Link>
                  </li>
              )}
            </ul>
          </div>
          <div className={styles['navbar-right']}>
            {user ? (
                <button className={`${styles.btn} ${styles['btn-danger']}`} onClick={signOut}>Sign Out</button>
            ) : (
                <Link className={`${styles.btn} ${styles['btn-success']}`} to="/login">Login</Link>
            )}
          </div>
        </div>
      </nav>
  );
};

export default Navbar;
