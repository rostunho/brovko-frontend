import { useState, useEffect, useRef } from 'react';
import {
  addNewCategory,
  getActiveCategories,
} from 'shared/services/api/brovko/categories';
import Modal from 'shared/components/Modal/Modal';
import Heading from 'shared/components/Heading';
import Selector from 'shared/components/Selector';
// import OldInput from 'shared/components/OldInput';
import Input from 'shared/components/Input';
import Button from 'shared/components/Button';
import { addCategoryRequestTemplate } from './addCategoryRequestTemplate';
import styles from './AddCategoryPopup.module.scss';
import { update } from 'redux/user/userOperations';

export default function AddCategoryPopup({
  data,
  closeModal,
  updateCategories,
  ...prop
}) {
  const [currentData, setCurrentData] = useState([]);

  const [requestBody, setRequestBody] = useState(addCategoryRequestTemplate);
  const [selectorIsShown, setSelectorIsShown] = useState(false);
  const [selectorValue, setSelectorValue] = useState('');
  const formRef = useRef();

  useEffect(() => {
    data && setCurrentData(data);
  }, [data]);

  useEffect(() => {
    const newBody = { ...requestBody };
    newBody.category[0].parentId = selectorValue.id;

    setRequestBody(newBody);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectorValue]);

  const onSave = async () => {
    const { updatedCategories } = await addNewCategory(requestBody, update);
    console.log('RESPONSE IN ON-SAVE', updatedCategories);
    // await getActiveCategories();
    updateCategories && updateCategories(updatedCategories);
    formRef.current.reset();
    closeModal();
  };

  const onInputChange = event => {
    const { name, value } = event.target;
    const newBody = { ...requestBody };
    newBody.category[0][name] = value;

    setRequestBody(newBody);
  };

  const toggleSelectorShown = () => {
    setSelectorIsShown(!selectorIsShown);
  };

  const updateSelectorValue = ({ id, name }) => {
    setSelectorValue({ id, name });
  };

  return (
    <Modal centered closeModal={closeModal}>
      <Heading>Додати категорію</Heading>
      <form className={styles.wrapper} ref={formRef}>
        <Input
          label="Назва нової категорії :"
          name="name"
          placeholder="Введіть назву нової категорії"
          onChange={onInputChange}
        />
        <Input
          label="ID нової категорії :"
          name="id"
          length="md"
          onChange={onInputChange}
        />
        <Input
          type="checkbox"
          label="Зробити підкатегорією :"
          placeholder="Введіть назву нової категорії"
          additionalFunction={toggleSelectorShown}
        />

        {selectorIsShown && (
          <Selector
            name="parentId"
            label=""
            data={currentData}
            // data={[{ name: '1' }, { name: '2' }, { name: '3' }, { name: '4' }]}
            value={selectorValue?.name}
            placeholder="Батьківська категорія"
            fetchSelectorValue={updateSelectorValue}
          />
        )}

        <Button type="button" onClick={onSave} style={{ marginTop: '16px' }}>
          Зберегти
        </Button>
      </form>
    </Modal>
  );
}

// const function10 = async () => {
//   console.log('function10 working');
// };
// const function11 = async () => {
//   console.log('function11 working');
// };
// const function12 = async () => {
//   console.log('function12 working');
// };
// const function20 = async () => {
//   console.log('function20 working');
// };
// const function21 = async () => {
//   console.log('function21 working');
// };
// const function22 = async () => {
//   console.log('function22 working');
// };

// export const functionA = async () => {
//   await function10();
//   await function11();
//   await function12();
// };
// export const functionB = async () => {
//   await function20();
//   await function21();
//   await function22();
// };
