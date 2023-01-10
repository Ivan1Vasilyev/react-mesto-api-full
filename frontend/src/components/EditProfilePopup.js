import { useEffect, useContext } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import useForm from '../hooks/useForm';
import Field from './Field';

const EditProfilePopup = ({ isOpen, onClose, onUpdateUser }) => {
  const { name, about } = useContext(CurrentUserContext);
  const { formik, disabled } = useForm({ name: '', about: '' }, onUpdateUser);
  const { touched, errors, resetForm, handleSubmit } = formik;

  useEffect(() => {
    if (isOpen) resetForm({ values: { name, about } });
  }, [isOpen]);

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      disabled={disabled}
    >
      <Field
        className={`form__input ${touched.name && errors.name && 'form__input_type_error'}`}
        type="text"
        name="name"
        formik={formik}
        errorClass="form"
      />
      <Field
        className={`form__input ${touched.about && errors.about && 'form__input_type_error'}`}
        type="text"
        name="about"
        formik={formik}
        errorClass="form"
      />
    </PopupWithForm>
  );
};

export default EditProfilePopup;
