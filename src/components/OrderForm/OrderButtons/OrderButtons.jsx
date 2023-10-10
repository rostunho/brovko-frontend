import { useNavigate } from 'react-router';
import Button from 'shared/components/Button';
import styles from './OrderButtons.module.scss';

export default function OrderButtons() {
  const navigate = useNavigate();

  return (
    <ul className={styles.list}>
      <li>
        <Button
          size="lg"
          mode="outlined"
          onClick={() => navigate('/shop/product-list-page')}
        >
          Повернутись до покупок
        </Button>
      </li>
      <li>
        <Button type="submit" size="lg">
          Підтверджую замовлення
        </Button>
      </li>
    </ul>
  );
}
