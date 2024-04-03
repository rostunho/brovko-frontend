import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import styles from './LocationList.module.scss';

export default function LocationList({
  data,
  initialData,
  streetSelector,
  onClick,
  ...props
}) {
  const [options, setOptions] = useState(data);
  let i = 0;

  useEffect(() => {
    data.length > 0
      ? setOptions([...data])
      : initialData
      ? setOptions([...initialData])
      : setOptions([]);
  }, [data, initialData]);

  return (
    <>
      <fieldset className={styles.dropdown}>
        {options.length < 1 && streetSelector ? (
          <p className={styles.warning}>
            Будь ласка, коректно введіть більше символів{' '}
          </p>
        ) : (
          options.map(option => {
            return (
              <label key={i++} className={styles.label}>
                {option.Present || option.Description}
                <input
                  type="radio"
                  name="option"
                  className={styles.option}
                  value={option}
                  onClick={() => onClick(option)}
                />
              </label>
            );
          })
        )}
      </fieldset>
    </>
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
