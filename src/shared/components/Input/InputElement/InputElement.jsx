import TextInput from '../TextInput';
import NumericInput from '../NumericInput';
import InputWithIcon from '../InputWithIcon';
import SelectingInput from '../SelectingInput';

export default function InputElement({ ...props }) {
  const { type } = props;

  if (type === 'text' || type === 'email') {
    return <TextInput {...props} />;
  } else if (type === 'tel' || type === 'number') {
    return <NumericInput {...props} />;
  } else if (
    type === 'password' ||
    type === 'url' ||
    type === 'date' ||
    type === 'search'
  ) {
    return <InputWithIcon {...props} />;
  } else if (type === 'checkbox' || type === 'radio') {
    return <SelectingInput {...props} />;
  }
}
