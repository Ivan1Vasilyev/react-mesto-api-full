import styles from './InfoTooltip.module.scss';
import Popup from '../Popup';
import acceptImage from '../../images/accepted.svg';
import errorImage from '../../images/error.svg';

const InfoTooltip = ({ onClose, isOpen, onError, errorMessage }) => (
  <Popup onClose={onClose} container="form" type="form_infotooltip" isOpen={isOpen}>
    <img className={styles.image} src={onError ? errorImage : acceptImage} alt="Картинка о результате регистарции" />
    <p className={styles.message}>
      {onError ? `Что-то пошло не так! ${errorMessage}` : 'Вы успешно зарегистрировались!'}
    </p>
  </Popup>
);

export default InfoTooltip;
