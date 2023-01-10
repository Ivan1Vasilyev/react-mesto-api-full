import { Switch, Route, Link } from 'react-router-dom';
import { ROUTE_SIGN_IN, ROUTE_SIGN_UP, ROUTE_MAIN } from '../utils/constants';

const Navbar = ({ email, loggedIn, onSignOut, isOpen }) => (
  <div className={`navbar ${loggedIn && (isOpen ? 'navbar_state_showed' : 'navbar_state_hidden')}`}>
    <p className="navbar__email">{loggedIn && email}</p>
    <Switch>
      <Route path={ROUTE_SIGN_IN}>
        <Link to={ROUTE_SIGN_UP} className={`navbar__button ${loggedIn || 'navbar__button_showed'}`}>
          Регистрация
        </Link>
      </Route>
      <Route path={ROUTE_SIGN_UP}>
        <Link to={ROUTE_SIGN_IN} className={`navbar__button ${loggedIn || 'navbar__button_showed'}`}>
          Войти
        </Link>
      </Route>
      <Route path={ROUTE_MAIN}>
        <Link to={ROUTE_SIGN_IN} className="navbar__button navbar__button_logged" onClick={onSignOut}>
          Выйти
        </Link>
      </Route>
    </Switch>
  </div>
);

export default Navbar;
