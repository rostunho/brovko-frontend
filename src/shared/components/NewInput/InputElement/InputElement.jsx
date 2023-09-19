// import TextInput from './TextInput'; // видалити разом з прототипним елементом

export default function InputElement(props) {
  const { type } = props;

  if (type === 'text' || type === 'email') {
    return <input {...props} />;
  } else if (type === 'tel' || type === 'number') {
    return <></>;
  }
}
