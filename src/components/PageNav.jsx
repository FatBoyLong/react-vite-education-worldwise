import { NavLink } from 'react-router-dom';
// NavLink allows us to highlight currently chosen page. Adding class 'active' to current link element

import styles from './PageNav.module.css';

function PageNav() {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <NavLink to="/">Homepage</NavLink>
        </li>
        <li>
          <NavLink to="/pricing">Pricing</NavLink>
        </li>
        <li>
          <NavLink to="/product">Product</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default PageNav;
