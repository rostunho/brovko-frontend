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
  initialValue,
  ...props
}) {
  const [searchValue, setSearchValue] = useState(() => initialValue || '');
  const [selectedData, setSelectedData] = useState(null);
  const [selectorIsOpen, setSelectorIsOpen] = useState(false);

  useEffect(() => {
    extractSearchValue && extractSearchValue(searchValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

  useEffect(() => {
    selectedData &&
      setSearchValue(selectedData.Present || selectedData.Description);
    extractData && extractData(selectedData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedData]);

  useEffect(() => {
    if (!searchValue) {
      return;
    }

    searchValue.length > 0 && !selectedData && searchValue !== initialValue
      ? setSelectorIsOpen(true)
      : setSelectorIsOpen(false);
  }, [initialValue, searchValue, selectedData]);

  const handleOnIconClick = event => {
    toggleSelector();

    setSearchValue('');
    setSelectedData(null);
  };

  const handleOnChange = event => {
    setSearchValue(event.target.value);
  };

  const onOptionClick = data => {
    setSelectedData(data);
    setSelectorIsOpen(false);
  };

  const toggleSelector = () => {
    setSelectorIsOpen(!selectorIsOpen);
  };

  return (
    <>
      <div {...props} className={styles.wrapper}>
        <SearchField
          {...props}
          name={name}
          label={label}
          placeholder={placeholder}
          value={searchValue}
          selectorIsOpen={selectorIsOpen}
          selectedData={selectedData}
          onChange={handleOnChange}
          onClick={handleOnIconClick}
          dataRef={selectedData && selectedData.Ref}
        />
        {selectorIsOpen && data?.length > 0 && (
          <LocationList data={data} onClick={onOptionClick} />
        )}
      </div>
      {withHotOptions && <HotOptions onClick={onOptionClick} />}
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
  // extractSearchValue: PropTypes.func.isRequired,
  // extractData: PropTypes.func.isRequired,
};
