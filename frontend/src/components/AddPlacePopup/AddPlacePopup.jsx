import { useEffect } from 'react';
import PopupWithForm from '../PopupWithForm';
import useForm from '../../hooks/useForm';
import Field from '../Field';

const AddPlacePopup = ({ isOpen, onClose, onAddPlace }) => {
  const { formik, disabled } = useForm({ name: '', link: '' }, onAddPlace);

  useEffect(() => {
    if (isOpen) formik.resetForm();
  }, [isOpen]);

  return (
    <PopupWithForm
      name="add-image"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={formik.handleSubmit}
      disabled={disabled}
      buttonText="Создать"
    >
      <Field styleType="in-popup" type="text" placeholder="Название" name="name" formik={formik} />
      <Field styleType="in-popup" type="url" placeholder="Ссылка на картинку" name="link" formik={formik} />
    </PopupWithForm>
  );
};

export default AddPlacePopup;
