import { useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import useForm from '../hooks/useForm';
import Field from './Field';

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
      <Field
        className={`form__input ${formik.touched.name && formik.errors.name && 'form__input_type_error'}`}
        type="text"
        placeholder="Название"
        name="name"
        formik={formik}
        errorClass="form"
      />
      <Field
        className={`form__input ${formik.touched.link && formik.errors.link && 'form__input_type_error'}`}
        type="url"
        placeholder="Ссылка на картинку"
        name="link"
        formik={formik}
        errorClass="form"
      />
    </PopupWithForm>
  );
};

export default AddPlacePopup;
