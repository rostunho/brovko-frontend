import PropTypes from 'prop-types';
import classes from './Input.module.scss';

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
  icon,
  metric,
  style,
  ...props
}) => {
  // const isCheckbox = type === 'checkbox';

  return (
    // <div
    //   className={`${classes.input_wrapper} ${
    //     isCheckbox ? classes.checkbox_wrapper : ''
    //   }`}
    // >
    <label
      className={`${classes.label} ${classes[`label_length-${length}`]}`}
      style={style}
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
        className={`${classes.input} ${classes[`input_${size}`]} `}
        onChange={onChange}
        disabled={mode === 'disabled'}
        {...props}
      />
      {icon && (
        <button type="button" className={classes.icon}>
          {icon}
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
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  length: PropTypes.oneOf(['sm', 'md', 'lg']),
  mode: PropTypes.string,
};

export default Input;
