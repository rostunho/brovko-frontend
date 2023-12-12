export default function TextInput({
  length,
  link,
  icon,
  type,
  onChange,
  ...props
}) {
  const handleOnChange = event => {
    onChange && onChange(event);
  };

  return (
    <input
      {...props}
      onChange={handleOnChange}
      inputMode="text"
      data-type={type}
      // value={props.value}
      // defaultValue={props.defaultValue}
    />
  );
}
