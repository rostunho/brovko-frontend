import { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useBodyScrollLock } from 'shared/hooks/useBodyScrollLock';
import Button from '../Button';
import styles from './Modal.module.scss';

const modalEl = document.querySelector('#modal-root');

const Modal = ({
  closeModal,
  centered,
  className,
  buttonClassName,
  children,
}) => {
  const closeModalOnClick = useCallback(
    ({ key, target, currentTarget }) => {
      if (key === 'Escape' || target === currentTarget) {
        closeModal();
      }
    },
    [closeModal]
  );

  useBodyScrollLock();

  useEffect(() => {
    document.addEventListener('keydown', closeModalOnClick);

    return () => document.removeEventListener('keydown', closeModalOnClick);
  }, [closeModalOnClick]);

  return createPortal(
    <div className={styles.backdrop} onClick={closeModalOnClick}>
      <div
        className={`${styles.modal} ${
          centered ? styles['modal--centered'] : ''
        } ${className ? className : ''}`}
      >
        {children}
        <Button
          mode="close"
          size="md"
          onClick={closeModal}
          className={buttonClassName}
        />
      </div>
    </div>,
    modalEl
  );
};

export default Modal;
