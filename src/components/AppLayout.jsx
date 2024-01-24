import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import styles from "./AppLayout.module.css";

function AppLayout() {
  return (
    <>
      <header className={styles.header}>
        <nav>
          <ul>
            <li>
              <NavLink to="/" className={styles.link}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="login" className={styles.link}>
                Login
              </NavLink>
            </li>
            <li>
              <NavLink to="signup" className={styles.link}>
                Signup
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default AppLayout;
