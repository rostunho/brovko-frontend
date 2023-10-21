import styles from './popup.module.scss'



const PopUp = ({message = 'PopUp'}) => {
  return <p className={styles.textMessage}>{message}</p>;
};

export default PopUp;
