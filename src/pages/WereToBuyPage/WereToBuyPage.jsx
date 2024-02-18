import {useState, useEffect} from 'react';
import { useLocation } from "react-router-dom";
import Heading from "shared/components/Heading";
import Modal from 'shared/components/Modal/Modal';
import WhereToBuy from "components/WhereToBuy/WhereToBuy";
import { getAllLocations } from "shared/services/api/brovko/locations";
import styles from './WereToBuyPage.module.scss'

export default function WereToBuyPage() {
  const location = useLocation();
  const backLinkHref = location.state?.from ?? "/";
  
  const [locationPoints, setLocationPoints] = useState([]);
  const [locationPointsError, setLocationPointsError] = useState(null);
  const [showErrorModal, setShowErrorModal] = useState(false); 
 

  useEffect(() => {
    fetchLocationPoints();
  }, []);

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
    <Modal  className={styles['modal-container']} closeModal={closeModal}>
    <div className={styles.modal}>
      <h2>Йой, сервер не відповідає...</h2>
      <p className={styles.modalText}>Помилка при завантаженні даних з сервера. Будь ласка, спробуйте ще раз пізніше.</p>
    </div>
  </Modal>    
    )
    

  
  return (
    <>
        <Heading withGoBack fromHC={backLinkHref}>Локації</Heading>
        
        {showErrorModal && errorModalContent}

        {location > 0  ?  
        <WhereToBuy
          locationPoints={locationPoints}
        /> :  
        <p className={styles.modalText}>{locationPointsError}</p>
        }
       
       
      
    </>
  );
}

