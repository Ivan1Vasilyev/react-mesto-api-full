import { useContext } from 'react';
import Popup from './Popup';
import { PopupOnLoadContext } from '../contexts/PopupOnLoadContext';

const PopupWithForm = (props) => {
  const textLoading = useContext(PopupOnLoadContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSubmit();
  };

  return (
    <Popup onClose={props.onClose} type={`popup__form-container ${props.type}`} isOpen={props.isOpen}>
      <form className="form" name={props.name} onSubmit={handleSubmit} noValidate>
        <h2 className={`form__title ${props.titleClassType}`}>{props.title}</h2>
        {props.children}
        <button
          className={`form__submit-button ${(textLoading || props.disabled) && 'form__submit-button_disabled'}`}
          type="submit"
          disabled={textLoading ? false : props.disabled}
        >
          {textLoading ? textLoading : props.buttonText || 'Сохранить'}
        </button>
      </form>
    </Popup>
  );
};

export default PopupWithForm;
