import { useState, useEffect } from 'react';
import { findCity } from 'shared/services/api/nova-poshta/nova-poshta-api';
import { LocationSelector } from 'shared/components/LocationSelector';
import regionCenters from './regionCenters';

export default function DeliveryCity({
  savedCity,
  handleData,
  withHotOptions,
  ...props
}) {
  const [cities, setCities] = useState([]);
  const [targetCity, setTargetCity] = useState('');
  const [initialCity, setInitialCity] = useState(() => savedCity || ''); // місто, ке ми отримуємо з бази даних
  const [selectedCityData, setSelectedCityData] = useState(null);

  useEffect(() => {
    if (savedCity && targetCity === savedCity.Present) {
      return;
    }
    fetchCitiesFromAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetCity]);

  useEffect(() => {
    handleData && selectedCityData && handleData.send(selectedCityData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCityData]);

  async function fetchCitiesFromAPI() {
    try {
      const value = targetCity?.toLowerCase();
      const response = await findCity(value);

      console.log('response in DELIVERY CITY :>> ', response);
      console.log(
        'count of warehouses :>> ',
        typeof response.Addresses[0].Warehouses
      );

      if (!response) {
        return;
      }
      const { Addresses: addresses } = response;

      setCities([...addresses]);
    } catch (error) {
      console.log(error.message);
    }
  }

  const clearCity = () => {
    // console.log('CLEAR CITY DATA WORKING');
    handleData && handleData.clear();
    setCities([]);
    setInitialCity(null);
    setSelectedCityData(null);
  };

  const extractTargetCity = data => {
    setTargetCity(data);
    // setCities([]);
  };

  const extractCityData = data => {
    setSelectedCityData(data);
    // setCities([]);
  };
  return (
    <LocationSelector
      withHotOptions={withHotOptions}
      data={cities?.length > 0 ? cities : []}
      label="Населений пункт"
      initialValue={initialCity?.Present}
      initialList={regionCenters}
      placeholder={'Вкажіть населений пункт'}
      extract={{ searchValue: extractTargetCity, data: extractCityData }}
      clear={clearCity}
    />
  );
}
