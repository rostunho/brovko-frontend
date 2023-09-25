import TextInput from '../TextInput';
import NumericInput from '../NumericInput';
import InputWithIcon from '../InputWithIcon';
import SelectingInput from '../SelectingInput';

export default function InputElement({ rootStateHandling, ...props }) {
  const { type } = props;

  if (type === 'text' || type === 'email') {
    return <TextInput rootStateHandling={rootStateHandling} {...props} />;
  } else if (type === 'tel' || type === 'number') {
    return <NumericInput rootStateHandling={rootStateHandling} {...props} />;
  } else if (type === 'password' || type === 'url' || type === 'date') {
    return <InputWithIcon rootStateHandling={rootStateHandling} {...props} />;
  } else if (type === 'checkbox' || type === 'radio') {
    return <SelectingInput rootStateHandling={rootStateHandling} {...props} />;
  }
}
