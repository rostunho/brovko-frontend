import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { deletePopUp } from 'redux/popup/popupSlice';
import Heading from '../Heading';
import styles from './popupitem.module.scss';

const PopUpItem = ({ data }) => {
  const [dataType, setDataType] = useState('success');
  const [title, setTitle] = useState('УПС!');
  const [defaultMessage, setDefaultMessage] = useState('У тебе все виходить !');
  const [fadeOutClassName, setFadeOutClassName] = useState('');
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

  useEffect(() => {
    setTimeout(() => {
      setFadeOutClassName(styles['fade-out']);
    }, 9500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const removePopup = id => {
    setFadeOutClassName(styles['fade-out']);
    setTimeout(() => {
      dispatch(deletePopUp(id));
    }, 500);
  };

  return (
    <li
      className={`${styles.container}  ${styles[dataType]} ${
        fadeOutClassName ? fadeOutClassName : ''
      }`}
      onClick={() => removePopup(data.id)}
    >
      <h3 type="h2" className={styles.title}>
        {title}
      </h3>
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
