import React from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import { useAuth } from "../context/authContext";
import styles from '../../styles/Navbar.module.css';

const Navbar = () => {
  let history = useHistory();
  const { isLoggedIn, logout } = useAuth();

  const handleLogout = () => {
    logout();
    history.push('/Login-Signup');
  };

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
              {/*{isLoggedIn && (
                  <li className={styles['nav-item']}>
                    <Link className={styles['nav-link']} to="/profile">
                      My Profile
                    </Link>
                  </li>
              )}*/}
            </ul>
          </div>
          <div className={styles['navbar-right']}>
            {isLoggedIn ? (
                <button className={`${styles.btn} ${styles['btn-danger']}`} onClick={handleLogout}>Logout</button>
            ) : (
                <Link className={`${styles.btn} ${styles['btn-success']}`} to="/Login-Signup">Login</Link>
            )}
          </div>
        </div>
      </nav>
  );
};

export default Navbar;
