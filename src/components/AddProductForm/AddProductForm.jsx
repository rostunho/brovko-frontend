import { useEffect, useState } from 'react';
import { addNewProduct } from 'shared/services/products';
import { addRequestTemplate } from './AddRequestTemplate';
import { getActiveCategories } from 'shared/services/categories';
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
  const [request, setRequest] = useState(addRequestTemplate);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    (async () => {
      const activeCategories = await getActiveCategories();
      const categoryNames = activeCategories.caregory.map(el => el.name);
      setCategories(categoryNames);
    })();
  }, []);

  const handleInputChange = e => {
    const updatedRequest = { ...request };

    if (e.target.name.includes('-')) {
      const [obj, key] = devideInputName(e.target.name);
      updatedRequest.product[0][obj][key] = e.target.value;
      setRequest(updatedRequest);
      return;
    }

    // if (updatedRequest[0][e.target.name].isArray()) {
    //   updatedRequest.product[0][e.target.name] = [...e.target.value];
    // }

    updatedRequest.product[0][e.target.name] = e.target.value;
    setRequest(updatedRequest);
  };

  const devideInputName = name => {
    const idx = name.indexOf('-');
    const obj = name.slice(0, idx);
    const key = name.slice(idx + 1, name.length);

    return [obj, key];
  };

  const volumeCount = () => {
    const currentData = { ...request };
    const { height, width, length } = currentData.product[0];
    const volume = (Number(height) * Number(width) * Number(length)) / 1000000;

    return volume.toFixed(2);
  };

  return (
    <div className={styles.container}>
      <Heading withGoBack>Додати новий товар </Heading>
      <form
        className={styles.form}
        onSubmit={async e => {
          e.preventDefault();
          await addNewProduct(request); // change to form submit
        }}
      >
        <Input label="Назва" name="name" onChange={handleInputChange} />

        <Input
          label="Назва для документів"
          name="nameForDocuments"
          onChange={handleInputChange}
        />

        <div className={styles.category}>
          <Select label="Категорія" name="Category" data={categories} />
          <Button mode="adding">Додати категорію </Button>
        </div>

        <div className={styles.innerContainer}>
          <Input
            label="Ціна"
            name="costPerItem"
            onChange={handleInputChange}
            length="md"
            placeholder="00.00"
          />
          <Input
            label="Cобівартість"
            name="expenses"
            length="md"
            onChange={handleInputChange}
          />
        </div>

        <div
          className={`${styles.innerContainer} ${styles.innerContainer_single}`}
        >
          <Input
            label="Знижка"
            name="discount-value"
            onChange={handleInputChange}
            length="md"
          />
          <Prompt>
            Знижку можна вказувати в абсолютному значенні, або у %
          </Prompt>
        </div>

        <div className={styles.dates}>
          <Input
            // type="date"
            label="Період знижки"
            name="discount-date_start"
            onChange={handleInputChange}
            length="md"
            icon={<CalendarIcon />}
          />
          <Input
            // type="date"
            name="discount-date_end"
            onChange={handleInputChange}
            length="md"
            icon={<CalendarIcon />}
          />
        </div>

        <Input
          label="Постачальник"
          name="supplier"
          onChange={handleInputChange}
        />

        <Input
          label="Виробник"
          name="manufacturer"
          onChange={handleInputChange}
        />

        <div className={styles.innerContainer}>
          <Input
            label="SKU"
            name="sku"
            length="md"
            onChange={handleInputChange}
          />
          <Input
            label="Вага"
            name="weight"
            onChange={handleInputChange}
            length="md"
            metric="кг"
          />
        </div>

        <Input
          label="Штрихкод"
          name="barcode"
          length="md"
          onChange={handleInputChange}
        />

        <div
          className={`${styles.innerContainer} ${styles.innerContainer_tripple}`}
        >
          <Input
            label="Висота"
            name="height"
            onChange={handleInputChange}
            length="sm"
            metric="см"
          />
          <Input
            label="Довжина"
            name="length"
            onChange={handleInputChange}
            length="sm"
            metric="см"
          />
          <Input
            label="Ширина"
            name="width"
            onChange={handleInputChange}
            length="sm"
            metric="см"
          />
        </div>

        <div
          className={`${styles.innerContainer} ${styles.innerContainer_single}`}
        >
          <Input
            label="Розмір"
            name="volume"
            value={volumeCount()}
            length="md"
            metric="м3"
          />
        </div>

        <div
          className={`${styles.innerContainer} ${styles.innerContainer_single}`}
        >
          <Input
            label="ID"
            name="id"
            length="md"
            onChange={handleInputChange}
          />
        </div>

        <Input
          label="Сторінка на сайті"
          name="url"
          onChange={handleInputChange}
          icon={<LinkIcon />}
          link="http://localhost:3000/main" // to change later
        />

        <Input label="Нотатка :" name="note" onChange={handleInputChange} />

        <Textarea
          label="Ключові слова :"
          name="keywords"
          onChange={handleInputChange}
          rows="3"
        />

        <Input
          label="Ярлики"
          name="name"
          onChange={() => {}} // add new function
          icon={<SettingsWheelIcon unfilled />}
        />

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

        <Textarea
          label="Опис :"
          name="description"
          onChange={handleInputChange}
          rows="6"
        />

        <Button type="submit" style={{ marginTop: '56px' }}>
          Зберегти
        </Button>
      </form>
    </div>
  );
}
