import classes from './Textarea.module.scss';

export default function Textarea({
  label,
  name,
  value,
  rows,
  placeholder,
  ...props
}) {
  return (
    <label className={classes.label}>
      {label}
      <textarea
        className={classes.textarea}
        name={name}
        value={value}
        rows={rows}
        placeholder={placeholder}
        {...props}
      />
    </label>
  );
}
