import { useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import useForm from '../hooks/useForm';
import Field from './Field';

const EditAvatarPopup = ({ isOpen, onClose, onUpdateAvatar }) => {
  const { formik, disabled } = useForm({ avatar: '' }, onUpdateAvatar);

  useEffect(() => {
    if (isOpen) formik.resetForm();
  }, [isOpen]);

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      type="popup__form-container_type_edit-avatar"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={formik.handleSubmit}
      disabled={disabled}
    >
      <Field
        className={`form__input ${formik.touched.avatar && formik.errors.avatar && 'form__input_type_error'}`}
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
