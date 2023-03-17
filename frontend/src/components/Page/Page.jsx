import styles from './Page.module.scss';

const Page = ({ children }) => (
  <div className={styles.background}>
    <div className={styles.root}>{children}</div>
  </div>
);

export default Page;
