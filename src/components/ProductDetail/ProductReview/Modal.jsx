import './Modal.module.scss';

const Modal = ({ isOpen, closeModal, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="modal-close" onClick={closeModal}>
          Закрити
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
