import { useState, useEffect } from 'react';
import { searchCity } from 'shared/services/nova-poshta';
import SearchField from './SearchField';
import LocationList from './LocationList';
import HotOptions from './HotOptions';
import styles from './LocationSelector.module.scss';

export default function LocationSelector({
  withHotOptions,
  label,
  placeholder,
  ...props
}) {
  const [searchInputValue, setSearchInputValue] = useState('');
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectorIsOpen, setSelectorIsOpen] = useState(false);

  useEffect(() => {
    if (searchInputValue.length < 1) {
      return;
    }
    (async () => {
      try {
        const searchValue = searchInputValue.toLowerCase();
        const response = await searchCity(searchValue);
        const { Addresses: addresses } = response;

        if (!response) {
          return;
        }

        setCities([...addresses]);
        console.log(addresses);
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, [searchInputValue]);

  useEffect(() => {
    searchInputValue.length > 0 && !selectedCity
      ? setSelectorIsOpen(true)
      : setSelectorIsOpen(false);
  }, [searchInputValue.length, selectedCity]);

  useEffect(() => {
    selectedCity && setSearchInputValue(selectedCity.Present);
  }, [selectedCity]);

  const handleOnIconClick = event => {
    toggleSelector();

    setSearchInputValue('');
    setSelectedCity(null);
  };

  const handleOnChange = event => {
    setSearchInputValue(event.target.value);
  };

  const selectCity = data => {
    setSelectedCity(data);
    setSelectorIsOpen(false);
  };

  const toggleSelector = () => {
    setSelectorIsOpen(!selectorIsOpen);
  };

  return (
    <>
      <div className={styles.wrapper}>
        <SearchField
          label={label}
          placeholder={placeholder}
          value={searchInputValue}
          selectorIsOpen={selectorIsOpen}
          selectedCity={selectedCity}
          setSearchInputValue={setSearchInputValue}
          onChange={handleOnChange}
          onClick={handleOnIconClick}
        />
        {selectorIsOpen && <LocationList data={cities} onClick={selectCity} />}
      </div>
      {withHotOptions && <HotOptions onClick={selectCity} />}
    </>
  );
}
