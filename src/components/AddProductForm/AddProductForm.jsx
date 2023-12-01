import { useEffect, useState, useRef } from 'react';
import { addNewProduct, getActiveCategories } from 'shared/services/api';
import Heading from 'shared/components/Heading';
import Input from 'shared/components/Input';
import Selector from 'shared/components/Selector/Selector';
import AddCategoryPopup from 'components/AddCategoryPopup/AddCategoryPopup';
import Button from 'shared/components/Button/Button';
import Textarea from 'shared/components/Textarea/Textarea';
import Prompt from 'shared/components/Prompt/Prompt';
import CalendarIcon from 'shared/icons/CalendarIcon';
import LinkIcon from 'shared/icons/LinkIcon';
import SettingsWheelIcon from 'shared/icons/SettingsWheelIcon';
import styles from './AddProductForm.module.scss';

import { useSelectorValue } from 'shared/hooks/useSelectorValue';
import { useAddProductState } from 'shared/hooks/useAddProductState';
import AddProductImage from './AddProductImage';

export default function AddProductForm() {
  const [requestBody, dispatchRequestBody] = useAddProductState();
  const [categories, setCategories] = useState([]);
  const [selectorValue, fetchSelectorValue] = useSelectorValue();
  const [productSize, setProductSize] = useState('0');
  const [categoryModalisOpen, setCategoryModalisOpen] = useState(false);
  const formRef = useRef();

  useEffect(() => {
    (async () => {
      const activeCategories = await getActiveCategories();
      const categoryNames = activeCategories.caregory.map(el => {
        return { name: el.name, id: el.id };
      });
      setCategories(categoryNames);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const checking =
      selectorValue?.name?.toLocaleLowerCase() !== 'без категорії';

    if (!checking) {
      dispatchRequestBody(null, 'ADD_CATEGORY', {
        id: '',
        name: '',
      });
      return;
    }

    dispatchRequestBody(null, 'ADD_CATEGORY', selectorValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectorValue]);

  useEffect(() => {
    const currentData = { ...requestBody };
    const { height, width, length } = currentData.product[0];
    const size = (Number(height) * Number(width) * Number(length)) / 1000000;

    setProductSize(size.toFixed(2));
  }, [productSize, requestBody]);

  const handleSubmit = async event => {
    event.preventDefault();

    await addNewProduct(requestBody);
    formRef.current.reset();
  };

  const toggleCategoryModal = () => {
    setCategoryModalisOpen(!categoryModalisOpen);
  };

  return (
    <div className={styles.container}>
      <Heading withGoBack>Додати новий товар</Heading>
      <form className={styles.form} ref={formRef} onSubmit={handleSubmit}>
        <Input
          label="Назва :"
          name="name"
          onBlur={e => dispatchRequestBody(e, 'ADD_NAME')}
        />

        <Input
          label="Назва для документів :"
          name="nameForDocuments"
          onChange={e => dispatchRequestBody(e, 'ADD_NAME_FOR_DOCS')}
        />
        <AddProductImage />
        <div className={styles.category}>
          <Selector
            name="Category"
            data={categories}
            defaultValue={{ name: 'Без категорії' }}
            defaultOption="Без категорії"
            fetchSelectorValue={fetchSelectorValue}
          />
          <Button mode="adding" onClick={toggleCategoryModal}>
            Додати категорію
          </Button>
        </div>

        {categoryModalisOpen && (
          <AddCategoryPopup
            data={categories}
            closeModal={toggleCategoryModal}
          />
        )}

        <div className={styles.innerContainer}>
          <Input
            type="number"
            label="Ціна :"
            name="costPerItem"
            length="md"
            currency="UAH"
            onChange={e => dispatchRequestBody(e, 'ADD_PRICE')}
          />
          <Input
            type="number"
            label="Cобівартість :"
            name="expenses"
            length="md"
            currency="UAH"
            onChange={e => dispatchRequestBody(e, 'ADD_EXPENSES')}
          />
        </div>

        <div className={`${styles.innerContainer} `}>
          <Input
            label="Знижка :"
            name="discount-value"
            onChange={e => dispatchRequestBody(e, 'ADD_DISCOUNT_VALUE')}
            length="md"
          />
          <Prompt>
            Знижку можна вказувати в абсолютному значенні, або у %
          </Prompt>
        </div>

        <div className={styles.dates}>
          <Input
            type="date"
            label="Період знижки :"
            name="discount-date_start"
            onChange={e => dispatchRequestBody(e, 'ADD_DISCOUNT_START')}
            length="md"
            icon={<CalendarIcon />}
          />
          <Input
            type="date"
            name="discount-date_end"
            onChange={e => dispatchRequestBody(e, 'ADD_DISCOUNT_END')}
            length="md"
            icon={<CalendarIcon />}
          />
        </div>

        <Input
          label="Постачальник :"
          name="supplier"
          onChange={e => dispatchRequestBody(e, 'ADD_SUPPLIER')}
        />

        <Input
          label="Виробник :"
          name="manufacturer"
          onChange={e => dispatchRequestBody(e, 'ADD_MANUFACTURER')}
        />

        <div className={styles.innerContainer}>
          <Input
            label="SKU :"
            name="sku"
            length="md"
            onChange={e => dispatchRequestBody(e, 'ADD_SKU')}
          />
          <Input
            type="number"
            label="Вага :"
            name="weight"
            onChange={e => dispatchRequestBody(e, 'ADD_WEIGHT')}
            length="md"
            metrical="кг"
          />
        </div>

        <Input
          label="Штрихкод :"
          name="barcode"
          length="md"
          onChange={e => dispatchRequestBody(e, 'ADD_BARCODE')}
        />

        <div
          className={`${styles.innerContainer} ${styles.innerContainer_tripple}`}
        >
          <Input
            type="number"
            label="Висота :"
            name="height"
            onChange={e => dispatchRequestBody(e, 'ADD_HEIGHT')}
            length="sm"
            metrical="см"
          />
          <Input
            type="number"
            label="Довжина :"
            name="length"
            onChange={e => dispatchRequestBody(e, 'ADD_LENGTH')}
            length="sm"
            metrical="см"
          />
          <Input
            type="number"
            label="Ширина :"
            name="width"
            onChange={e => dispatchRequestBody(e, 'ADD_WIDTH')}
            length="sm"
            metrical="см"
          />
        </div>

        <div
          className={`${styles.innerContainer} ${styles.innerContainer_single}`}
        >
          <Input
            type="number"
            label="Розмір :"
            name="volume"
            value={productSize}
            length="md"
            metrical="м3"
            readOnly
          />
        </div>

        <div
          className={`${styles.innerContainer} ${styles.innerContainer_single}`}
        >
          <Input
            label="ID товару :"
            name="id"
            length="md"
            onChange={e => dispatchRequestBody(e, 'ADD_ID')}
          />
        </div>

        <Input
          label="Сторінка на сайті :"
          name="url"
          type="url"
          onChange={e => dispatchRequestBody(e, 'ADD_URL')}
          icon={<LinkIcon />}
          link="http://localhost:3000/main" // to change later
        />

        <Input
          label="Нотатка :"
          name="note"
          onChange={e => dispatchRequestBody(e, 'ADD_NOTE')}
        />

        <Textarea
          label="Ключові слова :"
          name="keywords"
          onChange={e => dispatchRequestBody(e, 'ADD_KEYWORDS')}
          rows="3"
        />

        <Input
          label="Ярлики :"
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
          onChange={e => dispatchRequestBody(e, 'ADD_DESCRIPTION')}
          rows="6"
        />

        <Button type="submit" style={{ marginTop: '56px' }}>
          Зберегти
        </Button>
      </form>
    </div>
  );
}
