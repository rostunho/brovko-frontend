import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import {
  addNewProduct,
  getAllCategories,
  getProductById,
  getCategoryById,
} from 'shared/services/api';
import Heading from 'shared/components/Heading';
import Input from 'shared/components/Input';
import Selector from 'shared/components/Selector';
import AddCategoryPopup from './AddCategoryPopup/AddCategoryPopup';
import ParamsConstructor from './ParamsConstructor/ParamsConstructor';
import Button from 'shared/components/Button/Button';
import Textarea from 'shared/components/Textarea/Textarea';
import Prompt from 'shared/components/Prompt/Prompt';
import CalendarIcon from 'shared/icons/CalendarIcon';
import LinkIcon from 'shared/icons/LinkIcon';
import SettingsWheelIcon from 'shared/icons/SettingsWheelIcon';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './editor.css';

import styles from './AddProductForm.module.scss';

import { useSelectorValue } from 'shared/hooks/useSelectorValue';
import { useAddProductState } from 'shared/hooks/useAddProductState';
import AddProductImage from './AddProductImage';

export default function AddProductForm({ update }) {
  const [existingProduct, setExistingProduct] = useState(null);
  const [requestBody, dispatchRequestBody] = useAddProductState();
  const [categories, setCategories] = useState([]);
  const [selectorValue, fetchSelectorValue] = useSelectorValue({
    name: 'Без категорії',
    id: '',
  });
  const [productSize, setProductSize] = useState('0');
  const [categoryModalisOpen, setCategoryModalisOpen] = useState(false);
  const [refreshSelector, setRefreshSelector] = useState(false);
  const [params, setParams] = useState([]);
  const [files, setFiles] = useState([]);
  const [descriptionEditorValue, setDescriptionEditorValue] = useState('');

  const [isFocused, setIsFocused] = useState(false);

  const formRef = useRef();
  const { productId } = useParams();

  useEffect(() => {
    if (update) {
      (async () => {
        const existingProduct = await fetchExistingProduct(productId);
        // console.log('existingProduct :>> ', existingProduct);
        const existingCategory = await fetchExistingCategory(
          existingProduct.categoryId
        );

        setExistingProduct(prevState => {
          const newState = { ...prevState };
          newState.category = { ...existingCategory };
          return newState;
        });

        // console.log('existingCategory :>> ', existingCategory);
        dispatchRequestBody(null, 'ADD_SAVED_PRODUCT', existingProduct);
        dispatchRequestBody(null, 'ADD_SAVED_CATEGORY', existingCategory);
        setRefreshSelector(true);
      })();
    }

    updateCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (existingProduct?.categoryId === selectorValue?.id) {
      return;
    }

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

    setProductSize(size.toFixed(3));
  }, [productSize, requestBody]);

  useEffect(() => {
    setRefreshSelector(false);
  }, [refreshSelector]);

  useEffect(() => {
    if (params.length < 2) {
      return;
    }

    dispatchRequestBody(null, 'ADD_PARAMS', params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  useEffect(() => {
    dispatchRequestBody(null, 'ADD_DESCRIPTION', null, descriptionEditorValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [descriptionEditorValue]);

  const handleSubmit = async event => {
    event.preventDefault();
    console.log(requestBody, files);
    await addNewProduct(requestBody, files);
    formRef.current.reset();
  };

  const updateCategories = async updates => {
    if (!updates) {
      const { categories } = await getAllCategories();
      setCategories([...categories]);
    } else {
      const { categories } = await getAllCategories(updates);
      // console.log('response 222 :>> ', {categories});
      setCategories([...categories]);
    }
  };

  const fetchExistingProduct = async id => {
    const product = await getProductById(id);
    setExistingProduct({ ...product });
    return product;
  };

  const fetchExistingCategory = async id => {
    const category = await getCategoryById(id);
    fetchSelectorValue({ ...category });
    return category;
  };

  const toggleCategoryModal = () => {
    setCategoryModalisOpen(!categoryModalisOpen);
  };

  const extractParams = data => {
    const updatedData = data.map(el => {
      const param = {
        name: el.key,
        type: 'text',
        value: el.value,
      };

      return param;
    });
    // console.log('updatedData into extractParams :>> ', updatedData);
    setParams([...updatedData]);
  };

  // function detectCategoryNameById(id, array) {
  //   const foundProduct = array.find(el => el.id === id);
  //   return foundProduct?.name;
  // }

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div className={styles.container}>
      <Heading withGoBack>
        {!update ? 'Додати новий товар' : 'Редагувати товар'}
      </Heading>

      <form className={styles.form} ref={formRef} onSubmit={handleSubmit}>
        <Input
          label="Назва :"
          name="name"
          onChange={e => dispatchRequestBody(e, 'ADD_NAME')}
          value={requestBody.product[0].name}
        />

        <Input
          label="Назва для документів :"
          name="nameForDocuments"
          onChange={e => dispatchRequestBody(e, 'ADD_NAME_FOR_DOCS')}
          value={requestBody.product[0].nameForDocuments}
        />
        <AddProductImage
          pictures={existingProduct !== null ? existingProduct : []}
          setFiles={setFiles}
        />
        <div className={styles.category}>
          <Selector
            name="Category"
            data={categories}
            defaultValue={{ name: selectorValue.name }}
            initial
            defaultOption={'Без категорії'}
            fetchSelectorValue={fetchSelectorValue}
            refresh={refreshSelector}
          />
          <Button mode="adding" onClick={toggleCategoryModal}>
            Додати категорію
          </Button>
        </div>

        {categoryModalisOpen && (
          <AddCategoryPopup
            data={categories}
            updateCategories={updateCategories}
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
            value={requestBody.product[0].costPerItem}
          />
          <Input
            type="number"
            label="Cобівартість :"
            name="expenses"
            length="md"
            currency="UAH"
            onChange={e => dispatchRequestBody(e, 'ADD_EXPENSES')}
            // value='' //замінити на vendorprice, коли з'явиться
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
            value={requestBody.product[0].id}
            onChange={e => dispatchRequestBody(e, 'ADD_ID')}
          />

          <Input
            type="number"
            label="Залишок на складі"
            name="stock"
            length="md"
            value={requestBody.product[0].stockBalance}
            // defaultValue={''} // НЕ ЗАБУТИ ПЕРЕВІРИТИ
            onChange={e => dispatchRequestBody(e, 'ADD_STOCK_BALANCE')}
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

        {/* <Button
          mode="adding"
          size="sm"
          onClick={() => setShowParams(!showParams)}
        >
          Характеристики
        </Button> */}

        <ParamsConstructor
          initialParams={
            existingProduct?.params.length > 0 && existingProduct.params
          }
          extractData={extractParams}
        />

        <Button mode="adding" size="sm">
          Різновиди товарів
        </Button>

        <ReactQuill
          className={isFocused ? 'active-react-quill' : ''}
          theme="snow"
          value={descriptionEditorValue}
          onChange={setDescriptionEditorValue}
          onFocus={handleFocus}
          onBlur={handleBlur}
          modules={{
            toolbar: [
              [{ header: [1, 2, false] }],
              ['bold', 'italic', 'underline', 'strike', 'blockquote'],
              [
                { list: 'ordered' },
                { list: 'bullet' },
                { indent: '-1' },
                { indent: '+1' },
              ],
              ['link', 'image'],
              ['clean'],
            ],
          }}
          formats={[
            'header',
            'bold',
            'italic',
            'underline',
            'strike',
            'blockquote',
            'list',
            'bullet',
            'indent',
            'link',
            'image',
          ]}
        />

        <Button type="submit" style={{ marginTop: '56px' }}>
          Зберегти
        </Button>
      </form>
    </div>
  );
}
