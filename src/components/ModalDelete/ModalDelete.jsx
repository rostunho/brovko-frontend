import Button from 'shared/components/Button';

import Modal from 'shared/components/Modal/Modal';

import styles from './ModalDelete.module.scss';

const ModalDelete = () => {
  return (
    <div>
      <Modal>
        <p className={styles.text}>Видалити цей товар з кошику?</p>
        <div className={styles.wrapperButton}>
          <Button mode="outlined">Скасувати</Button>
          <Button mode="primary">Так</Button>
        </div>
      </Modal>
    </div>
  );
};
export default ModalDelete;
