import { useMemo } from 'react';
import { nanoid } from 'nanoid';
import css from './textFields.module.scss';


const TextField = ({ label, handleChange, ...props }) => {
  const id = useMemo(() => nanoid(), []);

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input id={id} onChange={handleChange} {...props} />
    </div>
  );
};

export default TextField;
