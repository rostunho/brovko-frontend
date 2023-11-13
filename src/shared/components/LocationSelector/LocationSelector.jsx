import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import SearchField from './SearchField';
import LocationList from './LocationList';
import HotOptions from './HotOptions';
import styles from './LocationSelector.module.scss';

export default function LocationSelector({
  data,
  name,
  label,
  withHotOptions,
  placeholder,
  initialValue,
  initialList,
  extract,
  clear,
  streetSelector,
  ...props
}) {
  const [searchValue, setSearchValue] = useState(() => initialValue || '');
  const [selectedData, setSelectedData] = useState(null);
  const [selectorIsOpen, setSelectorIsOpen] = useState(false);

  // щоб при першій зміні міста скинулась вулиця, яка збережена в базі даних
  useEffect(() => {
    setSearchValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    extract?.searchValue && extract.searchValue(searchValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

  useEffect(() => {
    selectedData &&
      setSearchValue(selectedData.Present || selectedData.Description);
    extract.data && extract.data(selectedData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedData]);

  useEffect(() => {
    if (streetSelector) {
      !selectedData &&
      searchValue !== initialValue &&
      searchValue !== '' &&
      data.length > 0
        ? // data.length < 1
          setSelectorIsOpen(true)
        : setSelectorIsOpen(false);
    } else {
      !selectedData && searchValue !== initialValue && searchValue !== ''
        ? // data.length < 1
          setSelectorIsOpen(true)
        : setSelectorIsOpen(false);
    }
  }, [data.length, initialValue, searchValue, selectedData, streetSelector]);

  // const handleOnIconClick = event => {
  //   initialValue && clearInitialList && clearInitialList();
  //   toggleSelector();

  //   setSearchValue('');
  //   setSelectedData(null);
  // };

  const clearAllData = () => {
    clear && clear();
    setSearchValue('');
    setSelectedData(null);
    setSelectorIsOpen(false);
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
          // onClick={handleOnIconClick}
          dataRef={selectedData && selectedData.Ref}
          // clearData={clearAllData}
          selector={{ toggle: toggleSelector, clear: clearAllData }}
        />
        {selectorIsOpen && (
          <LocationList
            data={data}
            onClick={onOptionClick}
            initialData={initialList}
            streetSelector={streetSelector}
          />
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
