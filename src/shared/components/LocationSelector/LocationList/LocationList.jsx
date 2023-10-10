import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import largestCities from '../largestCities';

import styles from './LocationList.module.scss';

export default function LocationList({
  data = [],
  onClick,
  deliveryPoint,
  ...props
}) {
  const [options, setOptions] = useState(data);
  let i = 0;

  useEffect(() => {
    data.length > 0 ? setOptions([...data]) : setOptions([...largestCities]);
  }, [data]);

  return (
    <fieldset className={styles.dropdown}>
      {options.map(option => {
        return (
          <label key={i++} className={styles.label}>
            {option.Present}
            <input
              type="radio"
              name="option"
              className={styles.option}
              value={option}
              onClick={() => onClick(option)}
            />
          </label>
        );
      })}
    </fieldset>
  );
}

LocationList.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      Present: PropTypes.string,
      MainDescription: PropTypes.string,
      ...PropTypes.any,
    })
  ),
};
