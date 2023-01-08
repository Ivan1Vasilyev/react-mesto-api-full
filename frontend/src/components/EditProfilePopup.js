import { useEffect, useContext } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import useForm from '../hooks/useForm';
import Field from './Field';

const EditProfilePopup = ({ isOpen, onClose, onUpdateUser }) => {
  const currentUser = useContext(CurrentUserContext);
  const { formik, disabled } = useForm({ name: '', about: '' }, onUpdateUser);

  useEffect(() => {
    if (isOpen) {
      formik.resetForm({
        values: { name: currentUser.name, about: currentUser.about },
      });
    }
  }, [isOpen]);

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={formik.handleSubmit}
      disabled={disabled}
    >
      <Field
        className={`form__input ${formik.touched.name && formik.errors.name && 'form__input_type_error'}`}
        type="text"
        name="name"
        formik={formik}
        errorClass="form"
      />
      <Field
        className={`form__input ${formik.touched.about && formik.errors.about && 'form__input_type_error'}`}
        type="text"
        name="about"
        formik={formik}
        errorClass="form"
      />
    </PopupWithForm>
  );
};

export default EditProfilePopup;
