import { createPortal } from 'react-dom';
import { useSelector } from 'react-redux';
import { getAllPopups } from 'redux/popup/popupSelectors';

import PopUpItem from './PopUpItem';

import styles from './popup.module.scss';

const PopUp = () => {
  const popups = useSelector(getAllPopups);
  console.log('popups :>> ', popups);
  return createPortal(
    <>
      {popups.length > 0 && (
        <ul className={styles.container}>
          {popups.map((popup, index) => (
            <PopUpItem data={popup} key={index} index={index} />
          ))}
        </ul>
      )}
    </>,
    document.querySelector('#service-root')
  );
};

export default PopUp;
