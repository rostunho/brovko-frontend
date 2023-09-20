import TextInput from '../TextInput';
import NumericInput from '../NumericInput';

export default function InputElement({ rootValueHandling, ...props }) {
  const { type } = props;

  if (type === 'text' || type === 'email') {
    return <TextInput rootValueHandling={rootValueHandling} {...props} />;
  } else if (type === 'tel' || type === 'number') {
    return <NumericInput rootValueHandling={rootValueHandling} {...props} />;
  }
}
