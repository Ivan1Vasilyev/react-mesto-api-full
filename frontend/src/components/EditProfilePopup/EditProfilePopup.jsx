import { useEffect, useContext } from 'react';
import PopupWithForm from '../PopupWithForm';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import useForm from '../../hooks/useForm';
import Field from '../Field';

const EditProfilePopup = ({ isOpen, onClose, onUpdateUser }) => {
  const { name, about } = useContext(CurrentUserContext);
  const { formik, disabled } = useForm({ name: '', about: '' }, onUpdateUser);

  useEffect(() => {
    if (isOpen) formik.resetForm({ values: { name, about } });
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
      <Field styleType="in-popup" type="text" name="name" formik={formik} />
      <Field styleType="in-popup" type="text" name="about" formik={formik} />
    </PopupWithForm>
  );
};

export default EditProfilePopup;
