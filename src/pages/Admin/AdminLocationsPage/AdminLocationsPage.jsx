import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  addLocation,
  getLocationById,
  updateLocationById,
} from 'shared/services/api/brovko/locations';
import Heading from 'shared/components/Heading';
import Input from 'shared/components/Input';
import PhonesConstrucor from 'components/Admin/PhonesConstrucor/PhonesConstrucor';
import WorkingHoursConstructor from '../../../components/Admin/WorkingHoursConstructor/WorkingHoursConstructor';
import Button from 'shared/components/Button';
import styles from './AdminLocationsPage.module.scss';

export default function AdminLocationsPage({ ...props }) {
  // const [existingLocation, setExistingLocation] = useState(null);
  const [requestBody, setRequestBody] = useState({
    name: '',
    fullName: '',
    latitude: '',
    longitude: '',
    address: '',
    mapUrl: '',
    phone: [],
    workingHours: {},
  });
  const [coords, setCoords] = useState('');
  const { locationId } = useParams();

  useEffect(() => {
    (async () => {
      const savedLocation = await getLocationById(locationId);
      // console.log('savedLocation into useEffect :>> ', savedLocation);

      setRequestBody({ ...savedLocation });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!requestBody.latitude || !requestBody.longitude) {
      return;
    }

    setCoords(requestBody.latitude + ', ' + requestBody.longitude);
  }, [requestBody]);

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
    // console.log('value :>> ', value);
    if (value.length < 36) {
      return;
    }
    const coords = value.split(', ');
    const latitude = coords[0];
    const longtitude = coords[1];

    // console.log('latitude :>> ', latitude);
    // console.log('longtitude :>> ', longtitude);

    setRequestBody(prevBody => {
      const newBody = { ...prevBody };
      newBody.latitude = latitude;
      newBody.longitude = longtitude;
      return newBody;
    });
  };

  const handlePhones = data => {
    setRequestBody(prevBody => {
      const newBody = { ...prevBody };
      const mappedData = data.map(({ tel }) => tel);
      newBody.phone = [...mappedData];
      return newBody;
    });
  };

  const handleWorkingHours = data => {
    setRequestBody(prevBody => {
      const newBody = { ...prevBody };
      newBody.workingHours = { ...data };
      return newBody;
    });
  };

  const handleSubmit = async event => {
    event.preventDefault();

    locationId
      ? await updateLocationById(locationId, requestBody)
      : await addLocation(requestBody);
  };

  return (
    <div className={styles.container}>
      <Heading withGoBack>
        {!locationId ? 'Створити нову локацію' : 'Редагувати локацію'}
      </Heading>
      <form className={styles.form} onSubmit={handleSubmit}>
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
        <PhonesConstrucor
          defaultData={requestBody.phone}
          extractData={handlePhones}
        />
        <WorkingHoursConstructor
          defaultData={{ ...requestBody.workingHours }}
          extractData={handleWorkingHours}
        />
        <Button type="submit">Зберегти</Button>
      </form>
    </div>
  );
}
