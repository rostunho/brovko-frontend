export default function TextInput({ rootStateHandling, ...props }) {
  const { type, onChange } = props;

  const handleOnChange = event => {
    onChange && onChange(event);
  };

  return (
    <input
      {...props}
      onChange={handleOnChange}
      inputMode="text"
      data-type={type}
    />
  );
}
