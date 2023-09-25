export default function SelectingInput({ rootStateHandling, ...props }) {
  const { type, className } = props;
  return <input {...props} type={type} className={`${className} `}></input>;
}
