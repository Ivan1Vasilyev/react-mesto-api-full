import { useContext } from 'react';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

const Main = props => {
  const { name, about, avatar } = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <button className="profile__edit-avatar" onClick={props.onEditAvatar}>
          <img className="profile__avatar" src={avatar} alt="Аватар" />
        </button>
        <div className="profile__info">
          <h1 className="profile__user-name">{name}</h1>
          <button
            className="profile__edit-button"
            type="button"
            aria-label="Редактировать профиль"
            onClick={props.onEditProfile}
          ></button>
          <p className="profile__user-info">{about}</p>
        </div>
        <button
          className="profile__button"
          type="button"
          aria-label="Добавить картинку"
          onClick={props.onAddPlace}
        ></button>
      </section>
      <section className="elements">
        <ul className="elements__container">
          {props.cards
            .map(card => (
              <Card
                key={card._id}
                card={card}
                showFullImageClick={props.showFullImageClick}
                onCardDelete={props.onCardDelete}
                onCardLike={props.onCardLike}
              />
            ))
            .reverse()}
        </ul>
      </section>
    </main>
  );
};

export default Main;
