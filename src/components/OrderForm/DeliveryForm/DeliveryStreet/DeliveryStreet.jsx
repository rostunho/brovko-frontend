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
  // initialValue,
  savedStreet,
  ...props
}) {
  const [streets, setStreets] = useState(['test']);
  const [targetStreet, setTargetStreet] = useState('');
  const [initialStreet, setInitialStreet] = useState(
    () => savedStreet?.street || ''
  );
  const [selectedStreetData, setSelectedStreetData] = useState(null);
  const [building, setBuilding] = useState(() => savedStreet?.building || '');
  const [apartment, setApartment] = useState(
    () => savedStreet?.apartment || ''
  );

  // useEffect(() => {
  //   setSavedStreetData(initialValue);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  useEffect(() => {
    // щоб при першій зміні міста скинулась вулиця, яка збережена в базі даних
    initialStreet?.SettlementStreetRef &&
    savedStreet?.street?.SettlementStreetRef ===
      initialStreet?.SettlementStreetRef
      ? setInitialStreet(savedStreet.street)
      : setInitialStreet('');

    setStreets([]);
    setTargetStreet('');
    setSelectedStreetData(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cityRef]);

  // useEffect(() => {
  //   savedStreet
  //     ? setSelectedStreetData(savedStreet)
  //     : setSelectedStreetData(null);

  //   savedAddress?.buildingNumber && setBuilding(savedAddress.buildingNumber);
  //   savedAddress?.flat && setApartment(savedAddress?.flat);

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (savedStreet && targetStreet === savedStreet?.street?.Present) {
      return;
    }
    fetchStreetsFromAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetStreet]);

  useEffect(() => {
    handleData &&
      selectedStreetData &&
      handleData.send(selectedStreetData, building, apartment);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apartment, building, selectedStreetData]);

  async function fetchStreetsFromAPI() {
    if (targetStreet.length < 3) {
      return;
    }

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

  const clearStreet = () => {
    handleData && handleData.clear();
    setStreets([]);
    setInitialStreet(null);
    setSelectedStreetData(null);
    setBuilding('');
    setApartment('');
  };

  const handleBuilding = event => {
    setBuilding(event.target.value);
  };

  const handleApartment = event => {
    setApartment(event.target.value);
  };

  return (
    <>
      <LocationSelector
        streetSelector
        data={streets}
        label="Оберіть вулицю"
        placeholder="Вкажіть назву вулиці"
        initialValue={initialStreet?.Present || ''}
        extract={{ searchValue: extractTargetStreet, data: extractStreetData }}
        clear={clearStreet}
      />

      {(selectedStreetData?.Present || initialStreet?.Present) && (
        <div
          className={`${styles['inner-container']} ${
            profile ? styles['in-profile'] : ''
          }`}
        >
          <Input
            type="text"
            labelClassName={styles.building}
            label="Будинок"
            value={building ? building : ''}
            length="md"
            onChange={handleBuilding}
          />
          {building && (
            <Input
              type="text"
              label="Квартира"
              value={apartment ? apartment : ''}
              length="md"
              onChange={handleApartment}
            />
          )}
        </div>
      )}
    </>
  );
}
