import ProductReviewsList from 'components/ProductReviewsList/ProductReviewsList';
import styles from './NewReviewsBox.module.scss';

export default function NewReviewsBox({ ...props }) {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Відгуки покупців:</h3>
      <ProductReviewsList />
    </div>
  );
}
