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
  id,
  onSubmitForm,
}) {
  const [userInfo, setUserInfo] = useState(() => ({
    phone,
    email,
    novaPoshta: { city, street, warehouse },
    buildingNumber,
    flat,
    id,
  }));

  const handleChange = e => {
    const { name, value } = e.target;

    setUserInfo(prevState => {
      return { ...prevState, [name]: value };
    });
  };

  const handleCityData = data => {
    // console.log('data :>> ', data);
    setUserInfo(prevState => {
      // console.log('prevState :>> ', prevState);
      return {
        ...prevState,
        novaPoshta: { ...prevState.novaPoshta, city: { ...data } },
      };
    });
    // console.log('userInfo :>> ', userInfo);
  };

  const handleStreetData = data => {
    setUserInfo(prevState => {
      // console.log('prevState :>> ', prevState);
      return {
        ...prevState,
        novaPoshta: { ...prevState.novaPoshta, street: { ...data } },
      };
    });
  };

  const handleWarehouseData = data => {
    setUserInfo(prevState => {
      // console.log('prevState :>> ', prevState);
      return {
        ...prevState,
        novaPoshta: { ...prevState.novaPoshta, warehouse: { ...data } },
      };
    });
  };

  const handleSubmit = e => {
    e.preventDefault();

    onSubmitForm({ ...userInfo });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Input
        type="tel"
        name="phone"
        value={userInfo?.phone}
        label="Номер телефону"
        onChange={handleChange}
      />
      <Input
        type="email"
        name="email"
        label="E-mail"
        value={userInfo?.email}
        onChange={handleChange}
      />

      <DeliveryCity
        name="city"
        profile
        initialValue={city?.Present}
        handleData={handleCityData}
      />

      <DeliveryStreet
        profile
        cityRef={userInfo.novaPoshta.city.Ref}
        initialValue={street?.Present}
        handleData={handleStreetData}
      />

      <div className={styles.address}>
        <Input
          label="Будинок"
          name="buildingNumber"
          value={userInfo?.buildingNumber}
          length="md"
          onChange={handleChange}
        />
        <Input
          label="Квартира"
          name="flat"
          value={userInfo?.flat}
          length="md"
          onChange={handleChange}
        />
      </div>

      <DeliveryWarehouse
        cityRef={userInfo.novaPoshta.city.Ref}
        initialValue={warehouse?.Description}
        handleData={handleWarehouseData}
      />
      <div className={styles.buttonsContainer}>
        <Button
          type="submit"
          size="lg"
          disabled={
            userInfo.phone === phone &&
            userInfo.email === email &&
            userInfo.buildingNumber === buildingNumber &&
            userInfo.flat === flat &&
            userInfo.novaPoshta.city.Ref === city.Ref &&
            userInfo.novaPoshta.street.Present === street.Present &&
            userInfo.novaPoshta.warehouse.Description === warehouse.Description
          }
        >
          Зберегти
        </Button>
        <Button size="lg" mode="outlined" onClick={() => {}}>
          Скасувати
        </Button>
      </div>
    </form>
  );
}
