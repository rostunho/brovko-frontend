import { useState, useEffect } from 'react';
import axios from 'axios';
import { searchCity } from 'shared/services/nova-poshta';
import SearchField from './SearchField';
import styles from './LocationSelector.module.scss';

export default function LocationSelector() {
  const [searchInputValue, setSearchInputValue] = useState('');
  const [cities, setCities] = useState([]);
  const [selectorIsOpen, setSelectorIsOpen] = useState(false);

  useEffect(() => {
    if (searchInputValue.length < 3) {
      return;
    }
    (async () => {
      try {
        const searchValue = searchInputValue.toLowerCase();
        const response = await searchCity(searchValue);

        console.log(response);
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, [searchInputValue]);

  // const searchBody = {
  //   apiKey: '1e5739f85d91dd3927bf602c8ecf5dd2',
  //   modelName: 'Address',
  //   calledMethod: 'searchSettlements',
  //   methodProperties: {
  //     CityName: 'київ',
  //     Limit: '50',
  //     Page: '1',
  //   },
  // };

  // const citySearch = async () => {
  //   const url = 'https://api.novaposhta.ua/v2.0/json/';
  //   const body = JSON.stringify(searchBody);
  //   const response = await axios.post(url, body);
  //   // console.log(response.data);
  // };
  // citySearch();

  /////////////////////////

  const handleOnChange = event => {
    setSearchInputValue(event.target.value);
  };

  const toggleSelector = () => {
    setSelectorIsOpen(!selectorIsOpen);
  };

  return (
    <div className={styles.form}>
      <SearchField
        label="Населений пункт"
        placeholder="Оберіть населений пункт"
        value={searchInputValue}
        selectorIsOpen={selectorIsOpen}
        onChange={handleOnChange}
        onClick={toggleSelector}
      />
    </div>
  );
}
