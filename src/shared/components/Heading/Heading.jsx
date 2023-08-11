import classes from './Heading.module.scss';

export default function Heading({ type = 'h2', children }) {
  return (
    <>
      {type === 'h1' && (
        <h1 className={`${classes.heading} ${classes.main}`}>{children}</h1>
      )}
      {type === 'h2' && (
        <h2 className={`${classes.heading} ${classes.large}`}>{children}</h2>
      )}
      {type === 'h3' && (
        <h3 className={`${classes.heading} ${classes.medium}`}>{children}</h3>
      )}
      {type === 'h4' && (
        <h4 className={`${classes.heading} ${classes.small}`}>{children}</h4>
      )}
    </>
  );
}
