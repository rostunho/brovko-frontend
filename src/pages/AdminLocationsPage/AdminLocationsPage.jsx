import { useState, useEffect } from 'react';
import Heading from 'shared/components/Heading';
import Input from 'shared/components/Input';
import styles from './AdminLocationsPage.module.scss';

export default function AdminLocationsPage({ ...props }) {
  const [requestBody, setRequestBody] = useState({
    name: '',
    fullName: '',
    latitude: '',
    longitude: '',
    address: '',
    mapUrl: '',
  });
  const [coords, setCoords] = useState('');

  //   console.log(
  //     'COORDS LENGTH TEST',
  //     '49.85694712834761, 24.02763907975984'.length
  //   );

  useEffect(() => {
    coords && handleCoords(coords);
  }, [coords]);

  const handleChange = e => {
    setRequestBody(prevBody => {
      const { name, value } = e.target;
      const newBody = { ...prevBody };
      newBody[name] = value;
      return newBody;
    });
  };

  const handleCoords = value => {
    console.log('value :>> ', value);
    if (value.length < 36) {
      return;
    }
    const coords = value.split(', ');
    const latitude = coords[0];
    const longtitude = coords[1];

    console.log('latitude :>> ', latitude);
    console.log('longtitude :>> ', longtitude);

    setRequestBody(prevBody => {
      const newBody = { ...prevBody };
      newBody.latitude = latitude;
      newBody.longitude = longtitude;
      return newBody;
    });
  };

  return (
    <div className={styles.container}>
      <Heading withGoBack>Створити локацію</Heading>
      <form className={styles.form}>
        <Input
          label="Заголовок :"
          name="name"
          value={requestBody.name}
          onChange={handleChange}
        />
        <Input
          label="Повна назва :"
          name="fullName"
          value={requestBody.fullName}
          onChange={handleChange}
        />
        <Input
          label="Адреса :"
          name="address"
          value={requestBody.address}
          onChange={handleChange}
        />
        {/* Увага ! Інша логіка обробки event.target.value */}
        <Input
          label="Координати :"
          name="coords"
          value={coords}
          onChange={e => setCoords(e.target.value)}
        />
        <Input
          label="Посилання на карту Google Maps :"
          name="mapUrl"
          value={requestBody.mapUrl}
          onChange={handleChange}
        />
      </form>
    </div>
  );
}
