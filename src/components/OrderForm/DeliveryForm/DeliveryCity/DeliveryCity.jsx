import { useState, useEffect } from 'react';
import { findCity } from 'shared/services/api/nova-poshta/nova-poshta-api';
import { LocationSelector } from 'shared/components/LocationSelector';

export default function DeliveryCity({
  savedCity,
  handleData,
  profile,
  initialValue,
  ...props
}) {
  const [cities, setCities] = useState([]);
  const [targetCity, setTargetCity] = useState('');
  const [selectedCityData, setSelectedCityData] = useState(null);

  useEffect(() => {
    savedCity ? setSelectedCityData(savedCity) : setSelectedCityData(null);
    setTargetCity('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (targetCity.length < 1) {
      return;
    }
    fetchCitiesFromAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetCity]);

  useEffect(() => {
    handleData && selectedCityData && handleData(selectedCityData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCityData]);

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
    // setCities([]);
  };

  const clearCities = () => {
    setCities();
  };

  const extractCityData = data => {
    setSelectedCityData(data);
    // setCities([]);
  };
  return (
    <LocationSelector
      {...props}
      withHotOptions={!profile}
      data={cities?.length > 0 ? cities : []}
      label="Населений пункт"
      initialValue={savedCity?.Present || initialValue}
      clearInitialList={clearCities}
      placeholder={'Вкажіть населений пункт'}
      extractSearchValue={extractTargetCity}
      extractData={extractCityData}
    />
  );
}
