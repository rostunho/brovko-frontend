import PropTypes from 'prop-types';
import { TextInput } from './TextInput';
import styles from './NewInput.module.scss';

export function NewInput({
  type = 'text',
  label,
  placeholder,
  labelClassName,
  inputClassName,
  name,
  value,
  length = 'lg',
  onChange,
}) {
  const InputComponent = props => {
    if (type === 'text' || type === 'email') {
      return <TextInput {...props} />;
    }
  };

  return (
    <label
      className={`${styles['input-box']} ${
        styles[`input-box__length--${length}`]
      } ${labelClassName ? labelClassName : ''}`}
    >
      {label}
      <InputComponent
        type={type}
        className={`${styles.input} ${styles[`input__type--${type}`]} ${
          inputClassName ? inputClassName : ''
        }`}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </label>
  );
}
NewInput.propTypes = {
  label: PropTypes.string,
  type: PropTypes.oneOf([
    'text',
    'number',
    'password',
    'email',
    'tel',
    'url',
    'date',
    'checkbox',
    'radio',
  ]),
};
