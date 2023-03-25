import styles from './ImagePopup.module.scss';
import Popup from '../Popup';

const ImagePopup = ({ card, isOpen, onClose }) => (
  <Popup container="image" backGround="dark" onClose={onClose} isOpen={isOpen}>
    <figure className={styles.wrapper}>
      <img className={styles.image} src={card.link} alt={card.name} />
      <figcaption className={styles.caption}>{card.name}</figcaption>
    </figure>
  </Popup>
);

export default ImagePopup;
