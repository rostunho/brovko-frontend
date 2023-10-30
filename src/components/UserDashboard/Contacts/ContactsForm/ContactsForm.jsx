import { useState } from 'react';
import Input from 'shared/components/Input';
import Button from 'shared/components/Button';
import styles from './ContactsForm.module.scss';

import {
  DeliveryCity,
  DeliveryStreet,
  DeliveryWarehouse,
} from 'components/OrderForm/DeliveryForm';

export default function ContactsForm({
  phone,
  email,
  city,
  street,
  warehouse,
  buildingNumber,
  flat,
}) {
  const [userInfo, setUserInfo] = useState(() => ({
    phone,
    email,
    city,
    street,
    buildingNumber,
    flat,
  }));

  return (
    <form
      className={styles.form}
      onSubmit={e => {
        e.preventDefault();
        console.log(e);
      }}
    >
      <Input
        type="tel"
        value={userInfo.phone}
        label="Номер телефону"
        // style={{ marginBottom: '16px' }}
      />
      <Input
        type="email"
        label="E-mail"
        value={userInfo.email}
        // style={{ marginBottom: '16px' }}
      />
      {/* <LocationSelector
        label="Місто"
        initialValue={city.Present}
        style={{ marginBottom: '16px' }}
        onChange={onCityChange}
      /> */}
      <DeliveryCity profile initialValue={city.Present} />

      {/* <LocationSelector label="Вулиця" style={{ marginBottom: '16px' }} /> */}
      <DeliveryStreet
        profile
        cityRef={city.Ref}
        initialValue={street.Present}
      />

      <div className={styles.address}>
        <Input
          label="Будинок"
          value={userInfo.buildingNumber}
          length="md"
          // style={{ marginBottom: '16px' }}
        />
        <Input
          label="Квартира"
          value={userInfo.flat}
          length="md"
          // style={{ marginBottom: '16px' }}
        />
      </div>

      {/* <LocationSelector label="Відділення Нової Пошти" /> */}
      <DeliveryWarehouse
        cityRef={city.Ref}
        initialValue={warehouse.Description}
      />
      <div className={styles.buttonsContainer}>
        <Button type="submit" size="lg">
          Зберегти
        </Button>
        <Button size="lg" mode="outlined" onClick={() => {}}>
          Скасувати
        </Button>
      </div>
    </form>
  );
}
