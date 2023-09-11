import { Link } from 'react-router-dom';
import Button from 'shared/components/Button';
import styles from './ProductDetail.module.scss';

export default function Review({ location }) {
  return (
    <div className={styles.rewieContainer}>
      <Link to={`rewie`} state={{ from: location }}>
        <div className={styles.rewieTitleContainer}>
          <h3 className={styles.rewieTitle}>
            Відгуки покупців <span className={styles.rewieCount}>(8)</span>
          </h3>
        </div>

        <p className={styles.descriptionText}>
          Ваші відгуки допоможуть іншим у виборі смаколика для свого улюбленця!
        </p>
        <Button
          type="submit"
          mode="outlined"
          style={{ paddingLeft: 86, paddingRight: 86, marginTop: 20 }}
        >
          Залишити відгук
        </Button>
      </Link>
    </div>
  );
}