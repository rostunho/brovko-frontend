import TextInput from '../TextInput';
import NumericInput from '../NumericInput';
import InputWithIcon from '../InputWithIcon';

export default function InputElement({ rootValueHandling, ...props }) {
  const { type } = props;

  console.log('type in InputElement :', type);

  if (type === 'text' || type === 'email') {
    return <TextInput rootValueHandling={rootValueHandling} {...props} />;
  } else if (type === 'tel' || type === 'number') {
    return <NumericInput rootValueHandling={rootValueHandling} {...props} />;
  } else if (type === 'password' || type === 'url' || type === 'date') {
    return <InputWithIcon rootValueHandling={rootValueHandling} {...props} />;
  }
}
