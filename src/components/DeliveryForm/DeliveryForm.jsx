import { useState } from 'react';
import Heading from 'shared/components/Heading';
import DeliveryCity from './DeliveryCity';
import DeliveryMethod from './DeliveryMethod';
import styles from './DeliveryForm.module.scss';

export default function DeliveryForm() {
  const [city, setCity] = useState(null);
  const [deliveryMethod, setDeliveryMethod] = useState(null);

  const handleCityData = data => {
    setCity(data);
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
        <button type="submit" style={{ marginTop: '100px' }}>
          TEST SUBMIT
        </button>
      </form>
    </div>
  );
}
