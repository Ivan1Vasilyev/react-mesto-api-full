import styles from './PageNotFound.module.scss';
import { Link } from 'react-router-dom';
import image from '../../images/not-found.jpg';
import littleImage from '../../images/not-found-mobile.jpg';

const PageNotFound = () => (
  <div className={styles.container}>
    <picture>
      <source srcSet={image} media="(min-width: 590px)" />
      <img className={styles.image} src={littleImage} alt="Страница не найдена" />
    </picture>
    <Link className={styles.link} to="/">
      ← Назад
    </Link>
  </div>
);

export default PageNotFound;
