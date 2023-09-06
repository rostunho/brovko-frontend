import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../Button/Button';
import styles from './Heading.module.scss';

export default function Heading({ type = 'h2', withGoBack, children }) {
  const location = useLocation();
  const from = location.state?.from || '/';
  const navigate = useNavigate();

  const onGoBackClick = () => {
    navigate(from);
  };

  return (
    <div className={styles.container}>
      {withGoBack && <Button mode="goBack" onClick={onGoBackClick} />}
      {type === 'h1' && (
        <h1
          className={`${styles.heading} ${styles.main} ${
            withGoBack && styles['with-goback']
          }`}
        >
          {children}
        </h1>
      )}
      {type === 'h2' && (
        <h2
          className={`${styles.heading} ${styles.large} ${
            withGoBack && styles['with-goback']
          }`}
        >
          {children}
        </h2>
      )}
      {type === 'h3' && (
        <h3
          className={`${styles.heading} ${styles.medium} ${
            withGoBack && styles['with-goback']
          }`}
        >
          {children}
        </h3>
      )}
      {type === 'h4' && (
        <h4
          className={`${styles.heading} ${styles.small} ${
            withGoBack && styles['with-goback']
          }`}
        >
          {children}
        </h4>
      )}
    </div>
  );
}
