import styles from './Main.module.scss';
import { useContext } from 'react';
import Card from '../Card';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';

const Main = props => {
  const { name, about, avatar } = useContext(CurrentUserContext);

  return (
    <main className={styles.container}>
      <section className={styles.profile}>
        <button className={styles.edit_avatar} onClick={props.onEditAvatar}>
          <img className={styles.avatar} src={avatar} alt="Аватар" />
        </button>
        <div className={styles.user_data}>
          <h1 className={styles.name}>{name}</h1>
          <button
            className={styles.edit_info__button}
            type="button"
            aria-label="Редактировать профиль"
            onClick={props.onEditProfile}
          ></button>
          <p className={styles.info}>{about}</p>
        </div>
        <button
          className={styles.add_place__button}
          type="button"
          aria-label="Добавить картинку"
          onClick={props.onAddPlace}
        ></button>
      </section>
      <section>
        <ul className={styles.cards_container}>
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
