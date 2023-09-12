import { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import Button from '../Button';
// import CrossIconModal from 'shared/icons/CrossIconModal';
import styles from './Modal.module.scss';

const modalEl = document.querySelector('#modal-root');

const Modal = ({ closeModal, centered, children }) => {
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

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => (document.body.style.overflow = 'auto');
  }, []);

  return createPortal(
    <div className={styles.backdrop} onClick={closeModalOnClick}>
      <div
        className={`${styles.modal} ${centered && styles['modal--centered']}`}
      >
        {children}
        <Button mode="close" size="md" onClick={closeModal} />
      </div>
    </div>,
    modalEl
  );
};

export default Modal;
