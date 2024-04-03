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

// import { useState, useEffect } from 'react';

// export default function TextInput({
//   length,
//   link,
//   icon,
//   type,
//   onChange,
//   value,
//   ...props
// }) {
//   const [inputValue, setInputValue] = useState('');

//   useEffect(() => {
//     if (!value) {
//       return;
//     }

//     setInputValue(value);
//   }, [value]);

//   const handleOnChange = event => {
//     onChange && onChange(event);
//   };

//   return (
//     <input
//       {...props}
//       value={inputValue}
//       onChange={handleOnChange}
//       inputMode="text"
//       data-type={type}
//       // value={props.value}
//       // defaultValue={props.defaultValue}
//     />
//   );
// }
