import styles from './PopupWithForm.module.scss';
import { useContext } from 'react';
import Popup from '../Popup';
import { PopupOnLoadContext } from '../../contexts/PopupOnLoadContext';

const PopupWithForm = props => {
  const textLoading = useContext(PopupOnLoadContext);

  return (
    <Popup onClose={props.onClose} container="form" type={`form_${props.type}`} isOpen={props.isOpen}>
      <form className={styles.form} name={props.name} onSubmit={props.onSubmit} noValidate>
        <h2 className={`${styles.title} ${styles[`title_${props.titleClassType}`]}`}>{props.title}</h2>
        {props.children}
        <button
          className={`${styles.submit_button} ${(textLoading || props.disabled) && styles.submit_button_disabled}`}
          type="submit"
          aria-label="Подтвердить"
          disabled={textLoading ? false : props.disabled}
        >
          {textLoading ? textLoading : props.buttonText || 'Сохранить'}
        </button>
      </form>
    </Popup>
  );
};

export default PopupWithForm;
