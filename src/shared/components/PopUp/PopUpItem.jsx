import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { deletePopUp } from 'redux/popup/popupSlice';
import Heading from '../Heading';
import styles from './popupitem.module.scss';

const PopUpItem = ({ data, index }) => {
  const [dataType, setDataType] = useState('success');
  const [title, setTitle] = useState('УПС!');
  const [defaultMessage, setDefaultMessage] = useState('У тебе все виходить !');
  const { text = 'Вам, повідомлення', type = 'success' } = data;
  const dispatch = useDispatch();

  useEffect(() => {
    switch (type) {
      case 'info':
        setDataType('info');
        setTitle('БРО!');
        setDefaultMessage('У тебе все виходить!');
        break;

      case 'warning':
        setDataType('warning');
        setTitle('УПС!');
        setDefaultMessage(
          <>
            Обережно !<br />
            Щось може піти не так ...
          </>
        );
        break;

      case 'error':
        setDataType('error');
        setTitle('ОЙ!');
        setDefaultMessage('Щось пішло не за планом :(');
        break;

      default:
        setDataType('success');
        setTitle('ЮХУ!');
        setDefaultMessage('Я зберіг твої зміни !');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const removePopup = () => {
    dispatch(deletePopUp());
  };

  return (
    <li
      key={index}
      className={`${styles.container}  ${styles[dataType]}`}
      onClick={removePopup}
    >
      <Heading type="h2" className={styles.title}>
        {title}
      </Heading>
      <p className={`${styles.message}`}>{text || defaultMessage}</p>
    </li>
  );
};

PopUpItem.propTypes = {
  data: PropTypes.shape({
    text: PropTypes.string,
    type: PropTypes.oneOf(['success', 'info', 'warning', 'error']),
  }),
};

export default PopUpItem;
