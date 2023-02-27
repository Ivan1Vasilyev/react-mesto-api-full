import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { PopupOnLoadContext } from '../contexts/PopupOnLoadContext';
import useForm from '../hooks/useForm';
import Field from './Field';
import { ROUTE_SIGN_IN } from '../utils/constants';

const FormLogin = ({ isRegister, ...props }) => {
  const textLoading = useContext(PopupOnLoadContext);
  const formData = isRegister
    ? { email: '', password: '', nameReg: '', aboutReg: '', avatarReg: '' }
    : { email: '', password: '' };

  const { formik, disabled } = useForm(formData, props.onSubmit);

  return (
    <div className="form-login">
      <form className="form-login__form" name={props.name} onSubmit={formik.handleSubmit} noValidate>
        <h2 className="form-login__title">{props.title}</h2>
        <Field
          className="form-login__input"
          type="email"
          placeholder="Email"
          autoComplete="email"
          name="email"
          formik={formik}
          errorClass="form-login"
        />
        <Field
          className="form-login__input"
          type="password"
          placeholder="Password"
          autoComplete={isRegister ? 'new-password' : 'current-password'}
          name="password"
          formik={formik}
          errorClass="form-login"
        />
        {isRegister && (
          <>
            <Field
              className="form-login__input"
              type="text"
              placeholder="Имя"
              autoComplete="name"
              name="nameReg"
              formik={formik}
              errorClass="form-login"
            />
            <Field
              className="form-login__input"
              type="text"
              placeholder="О себе"
              name="aboutReg"
              formik={formik}
              errorClass="form-login"
            />
            <Field
              className="form-login__input"
              type="url"
              placeholder="Ссылка на аватар"
              autoComplete="url"
              name="avatarReg"
              formik={formik}
              errorClass="form-login"
            />
          </>
        )}
        <button className="form-login__submit-button" type="submit" disabled={disabled}>
          {textLoading ? textLoading : props.buttonText}
        </button>
      </form>
      {isRegister && (
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
