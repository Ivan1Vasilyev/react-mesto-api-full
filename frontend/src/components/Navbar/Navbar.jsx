import styles from './Navbar.module.scss';
import { Switch, Route, Link } from 'react-router-dom';
import { ROUTE_SIGN_IN, ROUTE_SIGN_UP, ROUTE_MAIN } from '../../utils/constants';

const Navbar = ({ email, loggedIn, onSignOut, isOpen }) => (
  <div className={`${styles.container} ${loggedIn && (isOpen ? styles.showed : styles.hidden)}`}>
    <p className={styles.email}>{loggedIn && email}</p>
    <Switch>
      <Route path={ROUTE_SIGN_IN}>
        <Link to={ROUTE_SIGN_UP} className={`${styles.button} ${loggedIn || styles.button_showed}`}>
          Регистрация
        </Link>
      </Route>
      <Route path={ROUTE_SIGN_UP}>
        <Link to={ROUTE_SIGN_IN} className={`${styles.button} ${loggedIn || styles.button_showed}`}>
          Войти
        </Link>
      </Route>
      <Route path={ROUTE_MAIN}>
        <Link to={ROUTE_SIGN_IN} className={`${styles.button} ${styles.button_logged}`} onClick={onSignOut}>
          Выйти
        </Link>
      </Route>
    </Switch>
  </div>
);

export default Navbar;
