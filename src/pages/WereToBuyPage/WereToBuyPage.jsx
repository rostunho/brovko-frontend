import {useState, useEffect} from 'react';
import Heading from "shared/components/Heading";
import WhereToBuy from "components/WhereToBuy/WhereToBuy";
import { getAllLocations } from "shared/services/api/brovko/locations";

export default function WereToBuyPage() {
  const [locationPoints, setLocationPoints] = useState([]);
  const [locationPointsError, setLocationPointsError] = useState(null);
 

  useEffect(() => {
    fetchLocationPoints();
  }, []);

  const fetchLocationPoints = async () => {
    try {
      const locations = await getAllLocations();
      setLocationPoints(locations);
    } catch (error) {
      console.error('Помилка при отриманні локацій:', error);
      setLocationPointsError(
        'Не вдалося завантажити локації. Спробуйте знову пізніше.'
      );
    }
  };
  

  if (!locationPoints || locationPointsError) {
    return <p style={{ color: 'red', marginTop: '20px' }}> {locationPointsError} </p>
  }
  
  return (
    <>
        <Heading withGoBack>Локації</Heading>
       
        <WhereToBuy
          locationPoints={locationPoints}
        />
      
    </>
  );
}

