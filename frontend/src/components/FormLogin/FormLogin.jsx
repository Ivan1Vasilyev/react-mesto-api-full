import styles from './FormLogin.module.scss';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { PopupOnLoadContext } from '../../contexts/PopupOnLoadContext';
import useForm from '../../hooks/useForm';
import Field from '../Field';
import { ROUTE_SIGN_IN } from '../../utils/constants';

const FormLogin = ({ isRegister, ...props }) => {
  const textLoading = useContext(PopupOnLoadContext);
  const formData = isRegister
    ? { email: '', password: '', nameReg: '', aboutReg: '', avatarReg: '' }
    : { email: '', password: '' };

  const { formik, disabled } = useForm(formData, props.onSubmit);

  return (
    <div className={styles.container}>
      <form className={styles.form} name={props.name} onSubmit={formik.handleSubmit} noValidate>
        <h2 className={styles.title}>{props.title}</h2>
        <Field
          styleType="in-login"
          type="email"
          placeholder="Email"
          autoComplete="email"
          name="email"
          formik={formik}
        />
        <Field
          styleType="in-login"
          type="password"
          placeholder="Password"
          autoComplete={isRegister ? 'new-password' : 'current-password'}
          name="password"
          formik={formik}
        />
        {isRegister && (
          <>
            <Field
              styleType="in-login"
              type="text"
              placeholder="Имя"
              autoComplete="name"
              name="nameReg"
              formik={formik}
            />
            <Field styleType="in-login" type="text" placeholder="О себе" name="aboutReg" formik={formik} />
            <Field
              styleType="in-login"
              type="url"
              placeholder="Ссылка на аватар"
              autoComplete="url"
              name="avatarReg"
              formik={formik}
            />
          </>
        )}
        <button className={styles.submit_button} type="submit" aria-label="Отправить данные" disabled={disabled}>
          {textLoading ? textLoading : props.buttonText}
        </button>
      </form>
      {isRegister && (
        <p className={styles.caption}>
          {'Уже зарегистрированы? '}
          <Link to={ROUTE_SIGN_IN} className={styles.link}>
            Войти
          </Link>
        </p>
      )}
    </div>
  );
};

export default FormLogin;
