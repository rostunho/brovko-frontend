import { useState } from 'react';
import Heading from 'shared/components/Heading';
import DeliveryCity from './DeliveryCity';
import DeliveryStreet from './DeliveryStreet';
import DeliveryWarehouse from './DeliveryWarehouse';
import DeliveryMethod from './DeliveryMethod';
import styles from './DeliveryForm.module.scss';

export default function DeliveryForm() {
  const [city, setCity] = useState(null);
  const [street, setStreet] = useState(null);
  const [building, setBuilding] = useState(null);
  const [apartment, setApartment] = useState(null);
  const [warehouse, setWarehouse] = useState(null);
  const [deliveryMethod, setDeliveryMethod] = useState(null);

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

      <form
        name="delivery-form"
        onSubmit={e => {
          e.preventDefault();
          console.log(e);
        }}
      >
        <DeliveryCity handleData={handleCityData} />
        <DeliveryMethod handleDeliveryMethod={handleDeliveryMethod} />
        {/* {deliveryMethod?.method === 'address' && (
          <StreetSelector
            label="Вулиця"
            extractSearchValue={() => {}}
            extractData={() => {}}
          />
        )} */}

        {deliveryMethod?.method === 'address' && city?.Ref && (
          <DeliveryStreet cityRef={city.Ref} handleData={handleStreetData} />
        )}
        {deliveryMethod?.method === 'warehouse' && city?.Ref && (
          <DeliveryWarehouse
            handleData={handleWarehouseData}
            cityName={city.MainDescription}
            cityRef={city.Ref}
          />
        )}
        <button type="submit" style={{ marginTop: '100px' }}>
          TEST SUBMIT
        </button>
      </form>
    </div>
  );
}
