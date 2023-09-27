import { useState, useEffect } from 'react';
import { searchCity } from 'shared/services/nova-poshta';
import Heading from 'shared/components/Heading';
import LocationSelector from 'shared/components/LocationSelector';
import styles from './DeliveryForm.module.scss';

export default function DeliveryForm() {
  const [cities, setCities] = useState([]);
  const [targetCity, setTargetCity] = useState('');
  const [selectedCityData, setSelectedCityData] = useState(null);

  // fetch cities data from nova-poshta api
  useEffect(() => {
    if (targetCity.length < 1) {
      return;
    }
    (async () => {
      try {
        const value = targetCity.toLowerCase();
        const response = await searchCity(value);
        const { Addresses: addresses } = response;

        if (!response) {
          return;
        }

        setCities([...addresses]);
        console.log(addresses);
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, [targetCity]);

  const extractTargetCity = data => {
    setTargetCity(data);
  };

  const extractCityData = data => {
    setSelectedCityData(data);
  };

  return (
    <div className={styles.container}>
      <Heading type="h3">Доставка</Heading>

      <form
        name="delivery-form"
        onSubmit={e => {
          e.preventDefault();
          console.log(e);
        }}
      >
        <LocationSelector
          withHotOptions
          data={cities}
          label="Населений пункт"
          placeholder={'Вкажіть населений пункт'}
          extractSearchValue={extractTargetCity}
          extractData={extractCityData}
        />

        <button type="submit" style={{ marginTop: '100px' }}>
          TEST SUBMIT
        </button>
      </form>
    </div>
  );
}
