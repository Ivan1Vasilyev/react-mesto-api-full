import { useEffect } from 'react';
import PopupWithForm from '../PopupWithForm';
import useForm from '../../hooks/useForm';
import Field from '../Field';

const EditAvatarPopup = ({ isOpen, onClose, onUpdateAvatar }) => {
  const { formik, disabled } = useForm({ avatar: '' }, onUpdateAvatar);

  useEffect(() => {
    if (isOpen) formik.resetForm();
  }, [isOpen]);

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      type="edit_avatar"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={formik.handleSubmit}
      disabled={disabled}
    >
      <Field styleType="in-popup" type="url" placeholder="Ссылка на новый аватар" name="avatar" formik={formik} />
    </PopupWithForm>
  );
};

export default EditAvatarPopup;
