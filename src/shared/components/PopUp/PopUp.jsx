import { useSelector } from 'react-redux';
import { getAllPopups } from 'redux/popup/popupSelectors';

import PopUpItem from './PopUpItem';

import styles from './popup.module.scss';

const PopUp = () => {
  const popups = useSelector(getAllPopups);
  return (
    <>
      {popups.length > 0 && (
        <ul className={styles.container}>
          {popups.map((popup, index) => (
            <li
              key={index}
              className={styles.textMessage}
              // style={{ animationDelay: `1s` }}
            >
              <PopUpItem message={popup} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default PopUp;
