import Input from 'shared/components/Input';
import { LocationSelector } from 'shared/components/LocationSelector';
import Button from 'shared/components/Button';
import styles from './ContactsForm.module.scss';

export default function ContactsForm() {
  return (
    <form>
      <Input
        type="tel"
        label="Номер телефону"
        style={{ marginBottom: '16px' }}
      />
      <Input type="email" label="E-mail" style={{ marginBottom: '16px' }} />
      <LocationSelector label="Місто" style={{ marginBottom: '16px' }} />
      <div className={styles.address}>
        <Input label="Будинок" length="md" style={{ marginBottom: '16px' }} />
        <Input label="Квартира" length="md" style={{ marginBottom: '16px' }} />
      </div>
      <LocationSelector label="Відділення Нової Пошти" />
    </form>
  );
}
