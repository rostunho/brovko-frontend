import { useState } from 'react';
import PropTypes from 'prop-types';
import EyeIcon from 'shared/icons/EyeIcon';
import SearchIcon from 'shared/icons/SearchIcon';
import styles from './Input.module.scss';

const Input = ({
  label,
  id,
  type,
  name,
  value,
  onChange,
  onFocus,
  onBlur,
  placeholder,
  pattern,
  inputRef,
  size,
  length = 'lg',
  mode,
  icon,
  metric,
  link,
  style,
  checked,
  onClick,
  ...props
}) => {
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const isCheckbox = type === 'checkbox';

  const handleChackbox = () => {
    setCheckboxChecked(!checkboxChecked);
  };

  const withIcon = icon || type === 'password' || type === 'search';

  return (
    // <div
    //   className={`${styles.input_wrapper} ${
    //     isCheckbox ? styles.checkbox_wrapper : ''
    //   }`}
    // >
    <label
      // className={`${styles.label} ${styles[`label_length-${length}`]}`}
      className={`${
        isCheckbox
          ? `${styles.label} ${styles['checkbox-label']}`
          : `${styles.label} ${styles[`label_length-${length}`]}`
      }`}
      style={{ color: isCheckbox && checkboxChecked && '#f3a610' }}
    >
      {label}

      <input
        ref={inputRef}
        type={type || 'text'}
        id={id}
        name={name}
        value={value}
        pattern={pattern}
        placeholder={placeholder}
        className={`${styles.input} ${withIcon && styles['with-icon']}`}
        onChange={e => {
          isCheckbox && handleChackbox();
          onChange && onChange(e);
        }}
        onFocus={onFocus}
        onBlur={onBlur}
        checked={checkboxChecked}
        disabled={mode === 'disabled'}
        {...props}
      />
      {type === 'password' && (
        <button type="button" className={styles.icon} onClick={onClick}>
          <EyeIcon />
        </button>
      )}
      {type === 'search' && (
        <button type="button" className={styles.icon} onClick={onClick}>
          <SearchIcon />
        </button>
      )}

      {metric && metric !== 'м3' && <p className={styles.metric}>{metric}</p>}
      {metric === 'м3' && (
        <p className={styles.metric}>
          м<sup>3</sup>
        </p>
      )}
      {icon && !link ? (
        <button type="button" className={styles.icon}>
          {icon}
        </button>
      ) : (
        <a href={link} className={styles.icon} target="_blank" rel="noreferrer">
          {icon}
        </a>
      )}
    </label>
    // </div>
  );
};

Input.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  type: PropTypes.oneOf([
    'text',
    'password',
    'email',
    'number',
    'search',
    'checkbox',
  ]),
  name: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  // size: PropTypes.oneOf(['sm', 'md', 'lg']),
  length: PropTypes.oneOf(['sm', 'md', 'lg']),
  mode: PropTypes.string,
};

export default Input;
