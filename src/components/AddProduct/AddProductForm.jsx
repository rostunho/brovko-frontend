import Input from 'shared/components/Input';
import Button from 'shared/components/Button/Button';
import Heading from 'shared/components/Heading';
import classes from './AddProductForm.module.scss';

export default function AddProductForm() {
  return (
    <div className={classes.container}>
      <Heading>Додати новий товар</Heading>
      <form className={classes.form}>
        <Input label="Назва :" />
        <Input label="Назва для документів :" />
        <div className={classes.category}>
          <Input label="Категорія :" />
          <Button mode="adding">Додати категорію</Button>
        </div>
        <div className={classes.innerContainer}>
          <Input label="Ціна :" length="md" />
          <Input label="Cобівартість :" length="md" />
        </div>
        <Input label="Знижка :" length="md" />
        <div className={classes.dates}>
          <Input label="Період знижки :" length="md" />
          <Input length="md" />
        </div>
        <Input label="Постачальник :" />
        <Input label="Виробник :" />

        <Button type="submit" style={{ marginTop: '56px' }}>
          Зберегти
        </Button>
      </form>
    </div>
  );
}
