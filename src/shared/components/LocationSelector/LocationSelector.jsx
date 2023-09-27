import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import SearchField from './SearchField';
import LocationList from './LocationList';
import HotOptions from './HotOptions';
import styles from './LocationSelector.module.scss';

export default function LocationSelector({
  data,
  name,
  withHotOptions,
  label,
  placeholder,
  extractSearchValue,
  extractData,
  ...props
}) {
  const [searchValue, setSearchValue] = useState('');
  const [selectedData, sesetSelectedData] = useState(null);
  const [selectorIsOpen, setSelectorIsOpen] = useState(false);

  useEffect(() => {
    extractSearchValue(searchValue);
  }, [extractSearchValue, searchValue]);

  useEffect(() => {
    searchValue.length > 0 && !selectedData
      ? setSelectorIsOpen(true)
      : setSelectorIsOpen(false);
  }, [searchValue.length, selectedData]);

  useEffect(() => {
    selectedData && setSearchValue(selectedData.Present);
    extractData(selectedData);
  }, [extractData, selectedData]);

  const handleOnIconClick = event => {
    toggleSelector();

    setSearchValue('');
    sesetSelectedData(null);
  };

  const handleOnChange = event => {
    setSearchValue(event.target.value);
  };

  const selectCity = data => {
    sesetSelectedData(data);
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
          value={searchValue}
          selectorIsOpen={selectorIsOpen}
          selectedData={selectedData}
          onChange={handleOnChange}
          onClick={handleOnIconClick}
          dataRef={selectedData && selectedData.Ref}
        />
        {selectorIsOpen && <LocationList data={data} onClick={selectCity} />}
      </div>
      {withHotOptions && <HotOptions onClick={selectCity} />}
    </>
  );
}

LocationSelector.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      Present: PropTypes.string,
      MainDescription: PropTypes.string,
      ...PropTypes.any,
    })
  ),
};
