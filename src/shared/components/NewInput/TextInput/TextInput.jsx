export function TextInput({
  type,
  className,
  name,
  placeholder,
  value,
  onChange,
  ...props
}) {
  return (
    <input
      type={type}
      className={`${className ? className : ''}`}
      name={name}
      placeholder={placeholder}
      value={value}
      inputMode={type === 'email' ? 'email' : 'text'}
      onChange={onChange}
    />
  );
}
