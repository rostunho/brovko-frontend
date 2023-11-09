import { useEffect, useState } from 'react';
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

  // useEffect(() => { }, [])

  const handleChange = e => {
    const { name, value } = e.target;

    setUserInfo(prevState => {
      return { ...prevState, [name]: value };
    });
  };

  const getCityData = data => {
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

  const clearCityData = () => {
    console.log('clearCityData working in CONTACTS-FORM on top');
    setUserInfo(prevState => {
      return {
        ...prevState,
        // novaPoshta: { ...prevState.novaPoshta, city: { TEST: 'TEST' } },
        novaPoshta: { ...prevState.novaPoshta, city: {} },
      };
    });
  };

  const getStreetData = (streetData, buildingData, flatData) => {
    setUserInfo(prevState => {
      // console.log('prevState :>> ', prevState);
      return {
        ...prevState,
        novaPoshta: { ...prevState.novaPoshta, street: { ...streetData } },
        buildingNumber: buildingData,
        flat: flatData,
      };
    });
  };

  const clearStreetData = () => {
    setUserInfo(prevState => {
      return {
        ...prevState,
        novaPoshta: { ...prevState.novaPoshta, street: {} },
        buildingNumber: null,
        flat: null,
      };
    });
  };

  const getWarehouseData = data => {
    setUserInfo(prevState => {
      return {
        ...prevState,
        novaPoshta: { ...prevState.novaPoshta, warehouse: { ...data } },
      };
    });
  };

  const clearWarehouseData = () => {
    setUserInfo(prevState => {
      return {
        ...prevState,
        novaPoshta: { ...prevState.novaPoshta, warehouse: null },
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
        savedCity={city}
        handleData={{ send: getCityData, clear: clearCityData }}
      />

      {
        <DeliveryStreet
          profile
          cityRef={userInfo.novaPoshta.city.Ref}
          savedStreet={{
            street: userInfo.novaPoshta.city.Ref === city.Ref ? street : null,
            building:
              userInfo.novaPoshta.city.Ref === city.Ref ? buildingNumber : null,
            apartment: userInfo.novaPoshta.city.Ref === city.Ref ? flat : null,
          }}
          handleData={{ send: getStreetData, clear: clearStreetData }}
        />
      }

      <DeliveryWarehouse
        cityRef={userInfo.novaPoshta.city.Ref}
        savedWarehouse={
          userInfo.novaPoshta.city.Ref === city.Ref ? warehouse : null
        }
        handleData={{ send: getWarehouseData, clear: clearWarehouseData }}
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
            userInfo.novaPoshta.warehouse?.Description ===
              warehouse?.Description
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
