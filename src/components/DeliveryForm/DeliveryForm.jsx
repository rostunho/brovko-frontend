import Heading from 'shared/components/Heading';
import Selector from 'shared/components/Selector';
import styles from './DeliveryForm.module.scss';

export default function DeliveryForm() {
  return (
    <div className={styles.container}>
      <Heading type="h3">Доставка</Heading>

      <form>
        <Selector
          label="Населений пункт"
          placeholder="Оберіть населений пункт"
          data={[
            { name: 'Місто 1' },
            { name: 'Місто 2' },
            { name: 'Місто 3' },
            { name: 'Місто 4' },
            { name: 'Місто 5' },
          ]}
          hotOptionsData={[
            'Київ',
            'Львів',
            'Харків',
            'Дніпро',
            'Одеса',
            'Запоріжжя',
          ]}
        />
      </form>
    </div>
  );
}
