import { useState, useEffect } from 'react';
import { findCity } from 'shared/services/api/nova-poshta/nova-poshta-api';
import { LocationSelector } from 'shared/components/LocationSelector';

export default function DeliveryCity({
  handleData,
  profile,
  initialValue,
  ...props
}) {
  const [cities, setCities] = useState([]);
  const [targetCity, setTargetCity] = useState('');
  const [selectedCityData, setSelectedCityData] = useState(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => fetchCitiesFromAPI, [targetCity]);

  useEffect(() => {
    handleData && handleData(selectedCityData);
  }, [handleData, selectedCityData]);

  async function fetchCitiesFromAPI() {
    if (targetCity.length < 1) {
      return;
    }

    try {
      const value = targetCity.toLowerCase();
      const response = await findCity(value);
      if (!response) {
        return;
      }
      const { Addresses: addresses } = response;

      setCities([...addresses]);
    } catch (error) {
      console.log(error.message);
    }
  }

  const extractTargetCity = data => {
    setTargetCity(data);
  };

  const extractCityData = data => {
    setSelectedCityData(data);
  };
  return (
    <LocationSelector
      withHotOptions={!profile}
      data={cities}
      label="Населений пункт"
      initialValue={initialValue}
      placeholder={'Вкажіть населений пункт'}
      extractSearchValue={extractTargetCity}
      extractData={extractCityData}
    />
  );
}
