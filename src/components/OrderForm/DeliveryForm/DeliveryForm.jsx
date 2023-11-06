import { useState, useEffect } from 'react';
import Heading from 'shared/components/Heading';
import DeliveryCity from './DeliveryCity';
import DeliveryStreet from './DeliveryStreet';
import DeliveryWarehouse from './DeliveryWarehouse';
import DeliveryMethod from './DeliveryMethod';
import styles from './DeliveryForm.module.scss';

export default function DeliveryForm({ novaPoshta, savedAddress, getData }) {
  const [city, setCity] = useState(novaPoshta?.city || null);
  const [street, setStreet] = useState(null);
  const [building, setBuilding] = useState(null);
  const [apartment, setApartment] = useState(null);
  const [warehouse, setWarehouse] = useState(null);
  const [deliveryMethod, setDeliveryMethod] = useState(null);

  useEffect(() => {
    getData({ city: { ...city } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city]);

  useEffect(() => {
    getData({ street: { ...street } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [street]);

  useEffect(() => {
    getData({ building: building });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [building]);

  useEffect(() => {
    getData({ apartment: apartment });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apartment]);

  useEffect(() => {
    getData({ deliveryMethod: { ...deliveryMethod } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deliveryMethod]);

  useEffect(() => {
    getData({ warehouse: { ...warehouse } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [warehouse]);

  const handleCityData = data => {
    setCity(data);
  };

  const handleStreetData = (streetData, building, apartment) => {
    setStreet(streetData);
    setBuilding(building);
    setApartment(apartment);
  };

  const handleWarehouseData = data => {
    setWarehouse(data);
  };

  const handleDeliveryMethod = data => {
    setDeliveryMethod(data);
  };

  return (
    <div className={styles.container}>
      <Heading type="h3">Доставка</Heading>

      <DeliveryCity handleData={handleCityData} savedCity={novaPoshta?.city} />
      <DeliveryMethod handleDeliveryMethod={handleDeliveryMethod} />
      {/* {deliveryMethod?.method === 'address' && (
          <StreetSelector
            label="Вулиця"
            extractSearchValue={() => {}}
            extractData={() => {}}
          />
        )} */}

      {deliveryMethod?.method === 'address' && city?.Ref && (
        <DeliveryStreet
          cityRef={city.Ref}
          savedStreet={novaPoshta?.street}
          savedAddress={savedAddress}
          handleData={handleStreetData}
        />
      )}
      {deliveryMethod?.method === 'warehouse' && city?.Ref && (
        <DeliveryWarehouse
          handleData={handleWarehouseData}
          cityName={city.MainDescription}
          cityRef={city.Ref}
          savedWarehouse={novaPoshta?.warehouse}
        />
      )}
      {deliveryMethod?.method === 'postMachine' && city?.Ref && (
        <DeliveryWarehouse
          handleData={handleWarehouseData}
          // cityName={city.MainDescription}
          cityRef={city.Ref}
          postMachine
        />
      )}
    </div>
  );
}
