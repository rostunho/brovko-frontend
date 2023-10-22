import PopUpItem from './PopUpItem';

import React from 'react';
import { connect } from 'react-redux';

import styles from './popup.module.scss'

const popups = ['pop', 'up']

const PopUp = () => {

  return (
<> 
<ul className={styles.container}>
    {popups.map((popup, index) => (
      <li className={styles.textMessage} style={{animationDelay: `${index}s`}}><PopUpItem key={index} message={popup}
      //  index={index}
       /></li>   
     
    ))}
 </ul>
      </>
  );
};

const mapStateToProps = state => {
  return {
    popups: state.popup, // Перевірте, чи правильно названий ваш reducer у сторі
  };
};

export default connect(mapStateToProps)(PopUp);
