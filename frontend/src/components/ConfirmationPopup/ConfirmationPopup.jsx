import PopupWithForm from '../PopupWithForm';

const ConfirmationPopup = ({ onSubmit, ...props }) => {
  const handleSubmit = e => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <PopupWithForm
      name="confirm"
      title="Вы уверены?"
      type="confirm"
      buttonText="Да"
      titleClassType="confirm"
      onSubmit={handleSubmit}
      {...props}
    />
  );
};

export default ConfirmationPopup;
