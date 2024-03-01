import { useState, useEffect } from 'react';
import Heading from 'shared/components/Heading';
import DeliveryCity from './DeliveryCity';
import DeliveryStreet from './DeliveryStreet';
import DeliveryWarehouse from './DeliveryWarehouse';
import DeliveryMethod from './DeliveryMethod';
import styles from './DeliveryForm.module.scss';

export default function DeliveryForm({ savedData, getData }) {
  const [city, setCity] = useState(savedData?.novaPoshta?.city || null);
  const [street, setStreet] = useState(savedData?.novaPoshta?.street || null);
  const [building, setBuilding] = useState(savedData?.building || null);
  const [apartment, setApartment] = useState(savedData?.apartment || null);
  const [warehouse, setWarehouse] = useState('Test');
  const [deliveryMethod, setDeliveryMethod] = useState(null);

  // console.log('warehouse :>> ', warehouse);

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

  const getCityData = data => {
    setCity(data);
  };
  const clearCityData = () => {
    setCity(null);
  };

  const getStreetData = (selectedStreet, selectedBuilding, selectedFlat) => {
    setStreet(selectedStreet);
    setBuilding(selectedBuilding);
    setApartment(selectedFlat);
  };

  const clearStreetData = () => {
    setStreet(null);
    setBuilding(null);
    setApartment(null);
  };

  //////////

  const getWarehouseData = data => {
    setWarehouse(data);
  };

  const clearWarehouseData = () => {
    setWarehouse(null);
  };

  //////////

  const handleDeliveryMethod = data => {
    setDeliveryMethod(data);
  };

  return (
    <div className={styles.container}>
      <Heading type="h3">Доставка</Heading>

      <DeliveryCity
        name="city"
        withHotOptions
        savedCity={savedData?.novaPoshta?.city}
        handleData={{ send: getCityData, clear: clearCityData }}
      />
      <DeliveryMethod handleDeliveryMethod={handleDeliveryMethod} />

      {deliveryMethod?.method === 'address' && city?.Ref && (
        <DeliveryStreet
          cityRef={city.Ref}
          savedStreet={{
            // street: savedData?.novaPoshta?.street,
            street:
              city.Ref === savedData.novaPoshta.city.Ref
                ? savedData.novaPoshta.street
                : null,

            building:
              city.Ref === savedData.novaPoshta.city.Ref
                ? savedData?.building
                : null,
            apartment:
              city.Ref === savedData.novaPoshta.city.Ref
                ? savedData?.apartment
                : null,
          }}
          handleData={{ send: getStreetData, clear: clearStreetData }}
        />
      )}
      {deliveryMethod?.method === 'warehouse' && city?.Ref && (
        <DeliveryWarehouse
          cityRef={city?.Ref}
          savedWarehouse={
            city?.Ref === savedData.novaPoshta?.city?.Ref
              ? savedData.novaPoshta?.warehouse
              : null
          }
          handleData={{ send: getWarehouseData, clear: clearWarehouseData }}
        />
      )}
      {/* {deliveryMethod?.method === 'postMachine' && city?.Ref && (
        <DeliveryWarehouse
          handleData={getWarehouseData}
          // cityName={city.MainDescription}
          cityRef={city.Ref}
          postMachine
        />
      )} */}
    </div>
  );
}
