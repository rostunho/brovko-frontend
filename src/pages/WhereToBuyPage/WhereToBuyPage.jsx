import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserStatus } from 'redux/user/userSelectors';
import Heading from 'shared/components/Heading';
import WhereToBuy from 'components/WhereToBuy/WhereToBuy';
import Modal from 'shared/components/Modal/Modal';
import { getAllLocations } from 'shared/services/api/brovko/locations';
import SEO from 'components/SEO/SEO';
import styles from './WhereToBuyPage.module.scss';

export default function WhereToBuyPage() {
  const location = useLocation();
  const userStatus = useSelector(selectUserStatus);

  const backLinkHref = location.state?.from ?? '/';

  const [locationPoints, setLocationPoints] = useState([]);
  const [locationPointsError, setLocationPointsError] = useState(null);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [refreshLocations, setRefreshLocations] = useState(false);

  useEffect(() => {
    fetchLocationPoints();
  }, []);

  useEffect(() => {
    if (refreshLocations) {
      fetchLocationPoints();
    }
    setRefreshLocations(false);
  }, [refreshLocations]);

  const fetchLocationPoints = async () => {
    try {
      const locations = await getAllLocations();
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
      <SEO
        title="Локації | Де можна купити снеки | Brovko"
        description="Де можна купити смаколики від Бровка | Brovko - магазин корисних смаколиків для песиків"
        url="/all/where-to-buy"
      />

      {showErrorModal && errorModalContent}

      {locationPoints ? (
        <>
          <WhereToBuy
            userStatus={userStatus}
            locationPoints={locationPoints}
            refreshLocations={() => setRefreshLocations(true)}
          />
        </>
      ) : (
        <p className={styles.modalText}>{locationPointsError}</p>
      )}
    </>
  );
}
