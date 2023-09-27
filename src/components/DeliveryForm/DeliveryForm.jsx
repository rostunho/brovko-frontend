import { useState } from 'react';
import Heading from 'shared/components/Heading';
import LocationSelector from 'shared/components/LocationSelector';
import styles from './DeliveryForm.module.scss';

export default function DeliveryForm() {
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
          label="Населений пункт"
          placeholder={'Оберіть населений пункт'}
        />

        <button type="submit" style={{ marginTop: '100px' }}>
          TEST SUBMIT
        </button>
      </form>
    </div>
  );
}
