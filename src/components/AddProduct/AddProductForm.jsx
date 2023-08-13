import Input from 'shared/components/Input';
import Button from 'shared/components/Button/Button';
import Heading from 'shared/components/Heading';
import CalendarIcon from 'shared/icons/CalendarIcon';
import LinkIcon from 'shared/icons/LinkIcon';
import SettingsWheelIcon from 'shared/icons/SettingsWheelIcon';
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

        <div
          className={`${classes.innerContainer} ${classes.innerContainer_single}`}
        >
          <Input label="Знижка :" length="md" />
        </div>

        <div className={classes.dates}>
          <Input label="Період знижки :" length="md" icon={<CalendarIcon />} />
          <Input length="md" icon={<CalendarIcon />} />
        </div>

        <Input label="Постачальник :" />

        <Input label="Виробник :" />

        <div className={classes.innerContainer}>
          <Input label="SKU :" length="md" />
          <Input label="Вага :" length="md" metric="кг" />
        </div>

        <Input label="Штрихкод :" length="md" />

        <div className={classes.innerContainer}>
          <Input label="Висота" length="sm" metric="см" />
          <Input label="Довжина" length="sm" metric="см" />
          <Input label="Глибина" length="sm" metric="см" />
        </div>

        <Input label="Розмір :" length="md" metric="м3" />

        <Input label="ID :" length="md" />

        <Input label="Сторінка на сайті :" icon={<LinkIcon />} />

        <Input label="Ярлики :" icon={<SettingsWheelIcon />} />

        <Button mode="settings">Додаткові ціни</Button>

        <Button mode="settings">Характеристики</Button>

        <Button mode="adding">Різновиди товарів</Button>

        <Button type="submit" style={{ marginTop: '56px' }}>
          Зберегти
        </Button>
      </form>
    </div>
  );
}