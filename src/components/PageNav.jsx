import { NavLink } from 'react-router-dom';
// NavLink allows us to highlight currently chosen page. Adding class 'active' to current link element

import Logo from './Logo';

import styles from './PageNav.module.css';

function PageNav() {
  return (
    <nav className={styles.nav}>
      <Logo />

      <ul>
        <li>
          <NavLink to="/pricing">Pricing</NavLink>
        </li>
        <li>
          <NavLink to="/product">Product</NavLink>
        </li>
        <li>
          <NavLink to="/login" className={styles.ctaLink}>
            Login
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default PageNav;
