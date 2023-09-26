import Input from 'shared/components/Input';

import styles from './CustomerForm.module.scss';

export default function CustomerForm() {
  return (
    <form className={styles.form}>
      <Input
        name="lastName"
        label="Прізвище*"
        placeholder="Введіть своє прізвище"
      />
      <Input
        name="firstName"
        label={`${"Ім'я*"}`}
        placeholder={`Введіть своє ${"ім'я"}`}
      />
      <Input
        name="middleName"
        label="По-батькові"
        placeholder="Введіть своє по-батькові"
      />
      <Input name="phone" type="tel" label="Телефон*" />
      <Input
        name="email"
        type="email"
        label="E-mail*"
        placeholder="Введіть свій E-mail"
      />
    </form>
  );
}
