import { useState, useEffect } from 'react';
import { findStreet } from 'shared/services/api/nova-poshta/nova-poshta-api';
import { LocationSelector } from 'shared/components/LocationSelector';
import Input from 'shared/components/Input';
import styles from './DeliveryStreet.module.scss';

// import { nan } from 'shared/services/nova-poshta-api';

export default function DeliveryStreet({
  cityRef,
  handleData,
  profile,
  initialValue,
  ...props
}) {
  const [streets, setStreets] = useState([]);
  const [targetStreet, setTargetStreet] = useState('');
  const [selectedStreetData, setSelectedStreetData] = useState(null);
  const [building, setBuilding] = useState('');
  const [apartment, setApartment] = useState('');

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => fetchStreetsFromAPI, [cityRef, targetStreet]);

  useEffect(() => {
    handleData &&
      selectedStreetData &&
      handleData(selectedStreetData, building, apartment);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apartment, building, selectedStreetData]);

  async function fetchStreetsFromAPI() {
    if (targetStreet.length < 1) {
      return;
    }

    const value = targetStreet.toLowerCase();
    const response = await findStreet(value, cityRef);
    if (!response) {
      return;
    }
    const { Addresses: addresses } = response;

    setStreets([...addresses]);
  }

  const extractTargetStreet = data => {
    setTargetStreet(data);
  };

  const extractStreetData = data => {
    setSelectedStreetData({ ...data });
  };

  const handleBuilding = event => {
    setBuilding(event.target.value);
  };

  const handleApartment = event => {
    setApartment(event.target.value);
  };

  // nan('12345');
  // nan('1234s');

  return (
    <>
      <LocationSelector
        data={streets}
        label="Оберіть вулицю"
        placeholder="Вкажіть назву вулиці"
        extractSearchValue={extractTargetStreet}
        extractData={extractStreetData}
        initialValue={initialValue}
      />

      {!profile && selectedStreetData?.Present && (
        <div className={styles['inner-container']}>
          <Input
            type="text"
            labelClassName={styles.building}
            label="Будинок"
            length="md"
            onChange={handleBuilding}
          />
          {building && (
            <Input
              type="text"
              label="Квартира"
              length="md"
              onChange={handleApartment}
            />
          )}
        </div>
      )}
    </>
  );
}
