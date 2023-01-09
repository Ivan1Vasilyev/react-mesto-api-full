import PopupWithForm from './PopupWithForm';

const ConfirmationPopup = ({ onSubmit, ...props }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <PopupWithForm
      name="confirm"
      title="Вы уверены?"
      type="popup__form-container_type_confirm"
      buttonText="Да"
      titleClassType="form__title_type_confirm"
      onSubmit={handleSubmit}
      {...props}
    />
  );
};

export default ConfirmationPopup;
