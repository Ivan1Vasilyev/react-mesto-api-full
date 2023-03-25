import styles from './Card.module.scss';
import { useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

const Card = ({ card, onCardDelete, showFullImageClick, onCardLike }) => {
  const currentUserId = useContext(CurrentUserContext)._id;
  const isOwner = card.owner._id === currentUserId;
  const isLiked = card.likes.some(i => i._id === currentUserId);

  return (
    <li className={styles.container}>
      <img className={styles.image} src={card.link} alt={card.name} onClick={() => showFullImageClick(card)} />
      <h2 className={styles.caption}>{card.name}</h2>
      <div className={styles.like_container}>
        <button
          onClick={() => onCardLike(card._id, isLiked)}
          className={`${styles.like} ${isLiked && styles.like_active}`}
          type="button"
          aria-label="Лайк"
        ></button>
        <p className={styles.like_counter}>{card.likes.length}</p>
      </div>
      {isOwner && (
        <button
          className={styles.delete}
          type="button"
          aria-label="Удалить карточку"
          onClick={() => onCardDelete(card._id)}
        ></button>
      )}
    </li>
  );
};

export default Card;
