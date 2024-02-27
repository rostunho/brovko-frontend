import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserStatus } from 'redux/user/userSelectors';
import Heading from 'shared/components/Heading';
import AdminControlPanel from 'shared/components/AdminControlPanel/AdminControlPanel';
import WhereToBuy from 'components/WhereToBuy/WhereToBuy';
import Modal from 'shared/components/Modal/Modal';
import { getAllLocations } from 'shared/services/api/brovko/locations';
import styles from './WhereToBuyPage.module.scss';

export default function WhereToBuyPage() {
  const location = useLocation();
  const userStatus = useSelector(selectUserStatus);
  console.log('userStatus :>> ', userStatus);
  const backLinkHref = location.state?.from ?? '/';

  const [locationPoints, setLocationPoints] = useState([]);
  const [locationPointsError, setLocationPointsError] = useState(null);
  const [showErrorModal, setShowErrorModal] = useState(false);

  useEffect(() => {
    fetchLocationPoints();
  }, []);

  const fetchLocationPoints = async () => {
    try {
      const locations = await getAllLocations();
      // console.log('locations', locations);
      setLocationPoints(locations);
      setLocationPointsError(null);
      setShowErrorModal(false);
    } catch (error) {
      console.error('Помилка при отриманні локацій:', error);
      setLocationPointsError(
        'Не вдалося завантажити локації. Спробуйте знову пізніше.'
      );
      setShowErrorModal(true);
    }
  };
  // console.log('locationPoints', locationPoints);

  const closeModal = () => {
    setShowErrorModal(false);
  };

  const errorModalContent = (
    <Modal className={styles['modal-container']} closeModal={closeModal}>
      <div className={styles.modal}>
        <h2>Йой, сервер не відповідає...</h2>
        <p className={styles.modalText}>
          Помилка при завантаженні даних з сервера. Будь ласка, спробуйте ще раз
          пізніше.
        </p>
      </div>
    </Modal>
  );

  return (
    <>
      <Heading withGoBack fromHC={backLinkHref}>
        Локації
      </Heading>

      {showErrorModal && errorModalContent}

      {locationPoints ? (
        <>
          {(userStatus === 'superadmin' || userStatus === 'manager') && (
            <AdminControlPanel />
          )}
          <WhereToBuy locationPoints={locationPoints} />
        </>
      ) : (
        <p className={styles.modalText}>{locationPointsError}</p>
      )}
    </>
  );
}
