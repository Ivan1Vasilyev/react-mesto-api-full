import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const Card = ({ card, onCardDelete, showFullImageClick, onCardLike }) => {
  const { _id } = useContext(CurrentUserContext);
  const isOwner = card.owner._id === _id;
  const isLiked = card.likes.some((i) => i._id === _id);

  return (
    <li className="card">
      <img className="card__image" src={card.link} alt={card.name} onClick={() => showFullImageClick(card)} />
      <h2 className="card__caption">{card.name}</h2>
      <div className="card__like-container">
        <button
          onClick={() => onCardLike(card)}
          className={`card__like ${isLiked && 'card__like_active'}`}
          type="button"
          aria-label="Лайк"
        ></button>
        <p className="card__likes-counter">{card.likes.length}</p>
      </div>
      {isOwner && (
        <button
          className="card__delete"
          type="button"
          aria-label="Удалить карточку"
          onClick={() => onCardDelete(card._id)}
        ></button>
      )}
    </li>
  );
};

export default Card;
