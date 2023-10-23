import PopUpItem from './PopUpItem';

// import React from 'react';
import {  useSelector } from 'react-redux';

import styles from './popup.module.scss';
import { getAllPopups } from 'redux/popup/popupSelectors';

// const popups = ['pop','up'];

const PopUp = () => {
// const popups = ['pop','up'];
  const popups = useSelector(getAllPopups)
  console.log(popups)
  return (
    <>{popups.length > 0 && <ul className={styles.container}>
        {popups.map((popup, index) => (
          <li key={index}
            className={styles.textMessage}
            style={{ animationDelay: `${index}s` }}
          >
            <PopUpItem  message={popup} />
          </li>
        ))}
      </ul>}
    
    </>
  );
};

const mapStateToProps = state => {
  return {
    popups: state.popup, // Перевірте, чи правильно названий ваш reducer у сторі
  };
};

export default PopUp;
