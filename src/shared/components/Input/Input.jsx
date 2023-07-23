import PropTypes from 'prop-types';
import styles from './Input.module.scss';

const Input = ({
  label,
  id,
  type,
  name,
  value,
  onChange,
  placeholder,
  pattern,
  inputRef,
  size,
  length,
  mode,
  ...props
}) => {
  const isCheckbox = type === 'checkbox';

  return (
    <div
      className={`${styles.input_wrapper} ${
        isCheckbox ? styles.checkbox_wrapper : ''
      }`}
    >
      <label
        className={`${styles.label} ${styles[`label_${size}`]}`}
        htmlFor={id}
      >
        {label}
      </label>
      <input
        ref={inputRef}
        type={type || 'text'}
        id={id}
        name={name}
        value={value}
        pattern={pattern}
        placeholder={placeholder}
        className={`${styles.input} ${styles[`input_${size}`]} ${
          styles[`input_length-${length}`]
        }`}
        onChange={onChange}
        disabled={mode === 'disabled'}
        {...props}
      />
    </div>
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
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  length: PropTypes.oneOf(['sm', 'md', 'lg']),
  mode: PropTypes.string,
};

export default Input;
