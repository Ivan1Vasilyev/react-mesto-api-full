import styles from './Footer.module.scss';

const Footer = () => (
  <footer>
    <p className={styles.text}>© {new Date().getFullYear()} Mesto Russia</p>
  </footer>
);

export default Footer;
