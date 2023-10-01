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
  const [selectedData, setSelectedData] = useState(null);
  const [selectorIsOpen, setSelectorIsOpen] = useState(false);

  useEffect(() => {
    extractSearchValue && extractSearchValue(searchValue);
  }, [extractSearchValue, searchValue]);

  useEffect(() => {
    selectedData && setSearchValue(selectedData.Present);
    extractData && extractData(selectedData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedData]);

  useEffect(() => {
    searchValue.length > 0 && !selectedData
      ? setSelectorIsOpen(true)
      : setSelectorIsOpen(false);
  }, [searchValue.length, selectedData]);

  const handleOnIconClick = event => {
    toggleSelector();

    setSearchValue('');
    setSelectedData(null);
  };

  const handleOnChange = event => {
    setSearchValue(event.target.value);
  };

  const selectCity = data => {
    setSelectedData(data);
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
  extractSearchValue: PropTypes.func.isRequired,
  extractData: PropTypes.func.isRequired,
};