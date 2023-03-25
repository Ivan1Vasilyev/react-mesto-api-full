import styles from './Header.module.scss';
import { useEffect, useState } from 'react';
import logo from '../../images/logo.svg';
import Navbar from '../Navbar';

const Header = props => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggler = () => setIsMenuOpen(state => !state);
  useEffect(() => {
    if (!props.loggedIn) setIsMenuOpen(false);
  }, [props.loggedIn]);

  return (
    <>
      {isMenuOpen && props.loggedIn && <Navbar {...props} isOpen={isMenuOpen} />}
      <header className={styles.container}>
        <img className={styles.logo} src={logo} alt="Логотип" />
        <Navbar {...props} />
        {props.loggedIn && (
          <button className={`${styles.menu} ${isMenuOpen && styles.active}`} onClick={toggler}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        )}
      </header>
    </>
  );
};

export default Header;
