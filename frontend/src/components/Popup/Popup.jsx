import styles from './Popup.module.scss';

import { useEffect } from 'react';

const Popup = props => {
  const handleClickClosePopup = event => {
    if (event.target === event.currentTarget) props.onClose();
  };

  useEffect(() => {
    if (!props.isOpen) return;

    const handleEscClose = event => {
      if (event.key === 'Escape') props.onClose();
    };

    document.addEventListener('keydown', handleEscClose);

    return () => document.removeEventListener('keydown', handleEscClose);
  }, [props.isOpen]);

  return (
    <div
      className={`${styles.container} ${props.backGround} ${props.isOpen && styles.opened}`}
      onClick={handleClickClosePopup}
    >
      <div className={props.type}>
        {props.children}
        <button
          className={styles.close_icon}
          type="button"
          aria-label="Закрыть"
          onClick={handleClickClosePopup}
        ></button>
      </div>
    </div>
  );
};

export default Popup;
