import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { PopupOnLoadContext } from '../contexts/PopupOnLoadContext';
import useValidateForm from '../hooks/useForm';
import Field from './Field';
import { ROUTE_SIGN_IN } from '../utils/constants';

const FormLogin = (props) => {
  const textLoading = useContext(PopupOnLoadContext);

  const { formik, disabled } = useValidateForm({ email: '', password: '' }, props.onSubmit);

  return (
    <div className="form-login">
      <form className="form-login__form" name={props.name} onSubmit={formik.handleSubmit} noValidate>
        <h2 className="form-login__title">{props.title}</h2>
        <Field
          className="form-login__input"
          type="email"
          placeholder="Email"
          name="email"
          formik={formik}
          errorClass="form-login"
        />
        <Field
          className="form-login__input"
          type="password"
          placeholder="Password"
          name="password"
          formik={formik}
          errorClass="form-login"
        />
        <button className="form-login__submit-button" type="submit" disabled={disabled}>
          {textLoading ? textLoading : props.buttonText}
        </button>
      </form>
      {props.isRegister && (
        <p className="form-login__caption">
          {'Уже зарегистрированы? '}
          <Link to={ROUTE_SIGN_IN} className="form-login__link">
            Войти
          </Link>
        </p>
      )}
    </div>
  );
};

export default FormLogin;
