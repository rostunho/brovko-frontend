import classes from './Textarea.module.scss';

export default function Textarea({ label, name, rows, placeholder, ...props }) {
  return (
    <label className={classes.label}>
      {label}
      <textarea
        className={classes.textarea}
        name={name}
        rows={rows}
        placeholder={placeholder}
        {...props}
      />
    </label>
  );
}
