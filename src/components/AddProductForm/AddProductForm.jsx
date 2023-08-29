import Heading from 'shared/components/Heading';
import Input from 'shared/components/Input';
import Select from 'shared/components/Select/Select';
import Button from 'shared/components/Button/Button';
import Textarea from 'shared/components/Textarea/Textarea';
import Prompt from 'shared/components/Prompt/Prompt';
import CalendarIcon from 'shared/icons/CalendarIcon';
import LinkIcon from 'shared/icons/LinkIcon';
import SettingsWheelIcon from 'shared/icons/SettingsWheelIcon';
import styles from './AddProductForm.module.scss';

export default function AddProductForm() {
  return (
    <div className={styles.container}>
      <Heading withGoBack>Додати новий товар </Heading>
      <form
        className={styles.form}
        onSubmit={e => {
          e.preventDefault();
          console.dir(e.target.elements[2].value); // change to form submit
        }}
      >
        <Input label="Назва" />

        <Input label="Назва для документів" />

        <div className={styles.category}>
          <Select
            label="Категорія"
            name="Category"
            data={['Супер категорія', 'Мега категорія', 'Гіпер категорія']} // edit later
          />
          <Button mode="adding">Додати категорію </Button>
        </div>

        <div className={styles.innerContainer}>
          <Input label="Ціна" length="md" placeholder="00.00" />
          <Input label="Cобівартість" length="md" />
        </div>

        <div
          className={`${styles.innerContainer} ${styles.innerContainer_single}`}
        >
          <Input label="Знижка" length="md" />
          <Prompt>
            Знижку можна вказувати в абсолютному значенні, або у %
          </Prompt>
        </div>

        <div className={styles.dates}>
          <Input label="Період знижки" length="md" icon={<CalendarIcon />} />
          <Input length="md" icon={<CalendarIcon />} />
        </div>

        <Input label="Постачальник" />

        <Input label="Виробник" />

        <div className={styles.innerContainer}>
          <Input label="SKU" length="md" />
          <Input label="Вага" length="md" metric="кг" />
        </div>

        <Input label="Штрихкод" length="md" />

        <div
          className={`${styles.innerContainer} ${styles.innerContainer_tripple}`}
        >
          <Input label="Висота" length="sm" metric="см" />
          <Input label="Довжина" length="sm" metric="см" />
          <Input label="Глибина" length="sm" metric="см" />
        </div>

        <div
          className={`${styles.innerContainer} ${styles.innerContainer_single}`}
        >
          <Input label="Розмір" length="md" metric="м3" />
        </div>

        <div
          className={`${styles.innerContainer} ${styles.innerContainer_single}`}
        >
          <Input label="ID" length="md" />
        </div>

        <Input label="Сторінка на сайті" icon={<LinkIcon />} />

        <Textarea label="Нотатка :" rows="3" />

        <Input label="Ярлики" icon={<SettingsWheelIcon unfilled />} />

        <Input label="Комплект" type="checkbox" />

        <Button mode="settings" size="sm">
          Додаткові ціни
        </Button>

        <Button mode="settings" size="sm">
          Характеристики
        </Button>

        <Button mode="adding" size="sm">
          Різновиди товарів
        </Button>

        <Textarea label="Опис :" rows="6" />

        <Button type="submit" style={{ marginTop: '56px' }}>
          Зберегти
        </Button>

        <Button
          type="submit"
          mode="sort"
          // icon={<DropdownArrowIcon />}
          style={{ marginTop: '56px' }}
        >
          Зберегти
        </Button>
      </form>
    </div>
  );
}
