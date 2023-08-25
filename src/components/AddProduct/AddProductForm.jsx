import Heading from 'shared/components/Heading';
import Input from 'shared/components/Input';
import Button from 'shared/components/Button/Button';
import Textarea from 'shared/components/Textarea/Textarea';
import CalendarIcon from 'shared/icons/CalendarIcon';
import LinkIcon from 'shared/icons/LinkIcon';
import SettingsWheelIcon from 'shared/icons/SettingsWheelIcon';
import classes from './AddProductForm.module.scss';

export default function AddProductForm() {
  return (
    <div className={classes.container}>
      <Heading withGoBack>Додати новий товар </Heading>
      <form className={classes.form}>
        <Input label="Назва" />

        <Input label="Назва для документів" />

        <div className={classes.category}>
          <Input label="Категорія" />
          <Button mode="adding">Додати категорію </Button>
        </div>

        <div className={classes.innerContainer}>
          <Input label="Ціна" length="md" placeholder="00.00" />
          <Input label="Cобівартість" length="md" />
        </div>

        <div
          className={`${classes.innerContainer} ${classes.innerContainer_single}`}
        >
          <Input label="Знижка" length="md" />
        </div>

        <div className={classes.dates}>
          <Input label="Період знижки" length="md" icon={<CalendarIcon />} />
          <Input length="md" icon={<CalendarIcon />} />
        </div>

        <Input label="Постачальник" />

        <Input label="Виробник" />

        <div className={classes.innerContainer}>
          <Input label="SKU" length="md" />
          <Input label="Вага" length="md" metric="кг" />
        </div>

        <Input label="Штрихкод" length="md" />

        <div
          className={`${classes.innerContainer} ${classes.innerContainer_tripple}`}
        >
          <Input label="Висота" length="sm" metric="см" />
          <Input label="Довжина" length="sm" metric="см" />
          <Input label="Глибина" length="sm" metric="см" />
        </div>

        <div
          className={`${classes.innerContainer} ${classes.innerContainer_single}`}
        >
          <Input label="Розмір" length="md" metric="м3" />
        </div>

        <div
          className={`${classes.innerContainer} ${classes.innerContainer_single}`}
        >
          <Input label="ID" length="md" />
        </div>

        <Input label="Сторінка на сайті" icon={<LinkIcon />} />

        <Textarea label="Нотатка :" rows="3" />

        <Input label="Ярлики" icon={<SettingsWheelIcon unfilled />} />

        <Input label="Комплект" type="checkbox" />

        <Button mode="settings">Додаткові ціни </Button>

        <Button mode="settings">Характеристики</Button>

        <Button mode="adding">Різновиди товарів</Button>

        <Textarea label="Опис :" rows="6" />

        <Button type="submit" style={{ marginTop: '56px' }}>
          Зберегти
        </Button>
      </form>
    </div>
  );
}
