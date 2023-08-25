import { useState } from 'react';
import PropTypes from 'prop-types';
import EyeIcon from 'shared/icons/EyeIcon';
import classes from './Input.module.scss';

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
  style,
  checked,
  ...props
}) => {
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const isCheckbox = type === 'checkbox';

  const handleChackbox = () => {
    setCheckboxChecked(!checkboxChecked);
  };

  return (
    // <div
    //   className={`${classes.input_wrapper} ${
    //     isCheckbox ? classes.checkbox_wrapper : ''
    //   }`}
    // >
    <label
      // className={`${classes.label} ${classes[`label_length-${length}`]}`}
      className={`${
        isCheckbox
          ? `${classes.label} ${classes['checkbox-label']}`
          : `${classes.label} ${classes[`label_length-${length}`]}`
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
        className={`${classes.input} `}
        onChange={() => {
          handleChackbox();
          onChange && onChange();
        }}
        onFocus={onFocus}
        onBlur={onBlur}
        checked={checkboxChecked}
        disabled={mode === 'disabled'}
        {...props}
      />
      {(icon || type === 'password') && (
        <button type="button" className={classes.icon}>
          {icon || <EyeIcon />}
        </button>
      )}
      {metric && metric !== 'м3' && <p className={classes.metric}>{metric}</p>}
      {metric === 'м3' && (
        <p className={classes.metric}>
          м<sup>3</sup>
        </p>
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
