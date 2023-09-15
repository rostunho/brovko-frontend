import Input from 'shared/components/Input';
import Button from 'shared/components/Button';
import styles from './OrderForm.module.scss';

export default function OrderForm() {
  return (
    <form className={styles.form}>
      <Input label="Прізвище*" placeholder="Введіть своє прізвище" />
      <Input label={`${"Ім'я*"}`} placeholder={`Введіть своє ${"ім'я"}`} />
      <Input label="По-батькові" placeholder="Введіть своє по-батькові" />
      <Input type="tel" label="Телефон*" />
      <Input type="email" label="Е-мейл*" />

      <ul className={styles.list}>
        <li>
          <Button size="lg" mode="outlined">
            Повернутись до покупок
          </Button>
        </li>
        <li>
          <Button type="submit" size="lg">
            Оформити замовлення
          </Button>
        </li>
      </ul>
    </form>
  );
}
