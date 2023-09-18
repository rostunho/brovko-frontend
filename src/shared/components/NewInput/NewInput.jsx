import PropTypes from 'prop-types';
import TextInput from './TextInput';

import styles from './NewInput.module.scss';

export default function NewInput({
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
  const LabelComponent = ({ children }) => (
    <label
      className={`${styles['input-box']} ${
        styles[`input-box__length--${length}`]
      } ${labelClassName ? labelClassName : ''}`}
    >
      {label}
      {children}
    </label>
  );

  const InputComponent = props => {
    if (type === 'text' || type === 'email') {
      return <TextInput {...props} />;
    }
  };

  return (
    <InputComponent
      LabelComponent={LabelComponent}
      type={type}
      className={`${styles.input} ${inputClassName ? inputClassName : ''}`}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
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
