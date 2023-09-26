import { useState } from 'react';
import PropTypes from 'prop-types';
import PasswordToggler from '../PasswordToggler/PasswordToggler';
import SearchIcon from 'shared/icons/SearchIcon';
import styles from './OldInput.module.scss';

const OldInput = ({
  label,
  id,
  type = 'text',
  name,
  value,
  onClick,
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
  defaultChecked,
  additionalFunction,
  ...props
}) => {
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  // const [selectedRedio, setSelectedRedio] = useState(value);
  const [showPassword, setShowPassword] = useState(false);
  const isCheckbox = type === 'checkbox';
  const isRadio = type === 'radio';
  const withIcon = icon || type === 'password' || type === 'search';

  const handleChackbox = () => {
    setCheckboxChecked(!checkboxChecked);
    additionalFunction && additionalFunction();
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleType = () => {
    if (type === 'password' && !showPassword) {
      return 'password';
    } else if (type === 'password' && showPassword) {
      return 'text';
    } else {
      return type;
    }
  };

  return (
    <label
      className={`${styles.label} ${
        isCheckbox ? styles['checkbox-label'] : ''
      } ${isRadio ? styles['radio-label'] : ''} ${
        styles[`label_length-${length}`]
      }`}
      style={{ color: isCheckbox && checkboxChecked && '#f3a610' }}
    >
      {label}
      <input
        className={`${styles.input} ${withIcon ? styles['with-icon'] : ''}`}
        ref={inputRef}
        type={handleType()}
        id={id}
        name={name}
        value={value}
        pattern={pattern}
        placeholder={placeholder}
        onChange={e => {
          isCheckbox && handleChackbox();
          // isRadio && setSelectedRedio(e.target.value);
          onChange && onChange(e);
        }}
        onFocus={onFocus}
        onBlur={onBlur}
        checked={checked || checkboxChecked}
        defaultChecked={defaultChecked}
        disabled={mode === 'disabled'}
        {...props}
      />
      {type === 'password' && (
        <button type="button" className={styles.icon} onClick={onClick}>
          <PasswordToggler onClick={toggleShowPassword} />
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
      {icon && !link && (
        <button type="button" className={styles.icon}>
          {icon}
        </button>
      )}
    </label>
    // </div>
  );
};

OldInput.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  type: PropTypes.oneOf([
    'text',
    'password',
    'email',
    'number',
    'search',
    'checkbox',
    'tel',
    'radio',
    'url',
    'date',
  ]),
  name: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  // size: PropTypes.oneOf(['sm', 'md', 'lg']),
  length: PropTypes.oneOf(['sm', 'md', 'lg']),
  mode: PropTypes.string,
};

export default OldInput;
