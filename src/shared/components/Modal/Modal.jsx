import { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';

import styles from './Modal.module.scss';

const modalEl = document.querySelector('#modal-root');

const Modal = ({ closeModal, children }) => {
  const closeModalOnClick = useCallback(
    ({ key, target, currentTarget }) => {
      if (key === 'Escape' || target === currentTarget) {
        closeModal();
      }
    },
    [closeModal]
  );

  useEffect(() => {
    document.addEventListener('keydown', closeModalOnClick);

    return () => document.removeEventListener('keydown', closeModalOnClick);
  }, [closeModalOnClick]);

  return createPortal(
    <div className={styles.backdrop} onClick={closeModalOnClick}>
      <div className={styles.modal}>{children}</div>
    </div>,
    modalEl
  );
};

export default Modal;