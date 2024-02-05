import Heading from 'shared/components/Heading';
import Text from 'shared/components/Text/Text';
import Button from 'shared/components/Button';
import styles from './NoWarehouseWarning.module.scss';

export default function NoWarehouseWarning({ onClick }) {
  return (
    <div className={styles.container}>
      <Heading type="h2">Упс!</Heading>
      <Text className={styles.text}>
        Оберіть населений пункт із відділенням Нової Пошти
      </Text>
      <Button className={styles.button} onClick={onClick}>
        Ok
      </Button>
    </div>
  );
}
