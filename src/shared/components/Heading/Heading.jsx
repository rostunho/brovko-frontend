import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../Button/Button';
import styles from './Heading.module.scss';

export default function Heading({
  type = 'h2',
  withGoBack,
  style,
  children,
  fromHC,
  className,
  containerClassName,
}) {
  const location = useLocation();
  const navigate = useNavigate();

  console.log('location into HEADING :>> ', location);

  const from = location.state?.from || '/main';

  const onGoBackClick = () => {
    if (fromHC) {
      navigate(fromHC);
    } else {
      navigate(from);
    }
  };

  return (
    <div
      className={`${styles.container} ${
        containerClassName ? containerClassName : ''
      }`}
    >
      {withGoBack && <Button mode="goBack" onClick={onGoBackClick} />}
      {type === 'h1' && (
        <h1
          className={`${styles.heading} ${styles.h1} ${
            withGoBack && styles['with-goback']
          } ${className ? className : ''}`}
          style={style}
        >
          {children}
        </h1>
      )}
      {type === 'h2' && (
        <h2
          className={`${styles.heading} ${styles.h2} ${
            withGoBack && styles['with-goback']
          } ${className ? className : ''}`}
          style={style}
        >
          {children}
        </h2>
      )}
      {type === 'h3' && (
        <h3
          className={`${styles.heading} ${styles.h3} ${
            withGoBack && styles['with-goback']
          }`}
          style={style}
        >
          {children}
        </h3>
      )}
      {type === 'h4' && (
        <h4
          className={`${styles.heading} ${styles.h4} ${
            withGoBack && styles['with-goback']
          }`}
          style={style}
        >
          {children}
        </h4>
      )}
    </div>
  );
}
