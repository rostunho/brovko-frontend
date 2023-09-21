import Input from 'shared/components/Input';
import styles from './CustomerForm.module.scss';

export default function CustomerForm() {
  return (
    <form className={styles.form}>
      <Input label="Прізвище*" placeholder="Введіть своє прізвище" />
      <Input label={`${"Ім'я*"}`} placeholder={`Введіть своє ${"ім'я"}`} />
      <Input label="По-батькові" placeholder="Введіть своє по-батькові" />
      <Input type="tel" label="Телефон*" />
      <Input type="email" label="E-mail*" placeholder="Введіть свій E-mail" />
    </form>
  );
}
