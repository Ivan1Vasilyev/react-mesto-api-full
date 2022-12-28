import { useEffect } from 'react';

const Popup = ({ isOpen, ...props }) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleEscClose = (event) => {
      if (event.key === 'Escape') props.onClose();
    };

    document.addEventListener('keydown', handleEscClose);

    return () => document.removeEventListener('keydown', handleEscClose);
  }, [isOpen]);

  const handleClickClosePopup = (event) => {
    if (event.target === event.currentTarget) props.onClose();
  };

  return (
    <div className={`popup ${props.backGround} ${props.isOpen && 'popup_opened'}`} onClick={handleClickClosePopup}>
      <div className={props.type}>
        {props.children}
        <button
          className="popup__close-icon"
          type="button"
          aria-label="Закрыть"
          onClick={handleClickClosePopup}
        ></button>
      </div>
    </div>
  );
};

export default Popup;
