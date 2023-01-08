import { useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import useForm from '../hooks/useForm';
import Field from './Field';

const EditAvatarPopup = ({ isOpen, onClose, onUpdateAvatar }) => {
  const { formik, disabled } = useForm({ avatar: '' }, onUpdateAvatar);
  const { touched, errors, resetForm, handleSubmit } = formik;

  useEffect(() => {
    if (isOpen) resetForm();
  }, [isOpen]);

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      type="popup__form-container_type_edit-avatar"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      disabled={disabled}
    >
      <Field
        className={`form__input ${touched.avatar && errors.avatar && 'form__input_type_error'}`}
        type="url"
        placeholder="Ссылка на новый аватар"
        name="avatar"
        formik={formik}
        errorClass="form"
      />
    </PopupWithForm>
  );
};

export default EditAvatarPopup;
