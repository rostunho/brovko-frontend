import { useDispatch, useSelector } from 'react-redux';
import { getWarning } from 'redux/warning/warningSelectors';
import { hideWarning } from 'redux/warning/warningSlice';
import Modal from '../Modal/Modal';
import Heading from 'shared/components/Heading';
import Text from 'shared/components/Text/Text';
import Button from 'shared/components/Button';
import styles from './WarningModal.module.scss';

export default function WarningModal({ onClick }) {
  const { shown, message, title } = useSelector(getWarning);
  const dispatch = useDispatch();

  const closeWarning = () => {
    onClick && onClick();
    dispatch(hideWarning());
  };

  return (
    <>
      {shown && (
        <Modal closeModal={closeWarning}>
          <div className={styles.container}>
            <Heading type="h2">{title}</Heading>
            <Text className={styles.text}>{message}</Text>
            <Button className={styles.button} onClick={closeWarning}>
              Ok
            </Button>
          </div>
        </Modal>
      )}
    </>
  );
}
