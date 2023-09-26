import { useState, useEffect, useRef } from 'react';
import { addNewCategory } from 'shared/services/categories';
import Modal from 'shared/components/Modal/Modal';
import Heading from 'shared/components/Heading';
import Selector from 'shared/components/Selector';
import OldInput from 'shared/components/OldInput';
import Button from 'shared/components/Button';
import { addCategoryRequestTemplate } from './addCategoryRequestTemplate';
import styles from './AddCategoryPopup.module.scss';

export default function AddCategoryPopup({ data, closeModal, ...prop }) {
  const [requestBody, setRequestBody] = useState(addCategoryRequestTemplate);
  const [selectorIsShown, setSelectorIsShown] = useState(false);
  const [selectorValue, setSelectorValue] = useState('');
  const formRef = useRef();

  useEffect(() => {
    const newBody = { ...requestBody };
    newBody.category[0].parentId = selectorValue.id;

    setRequestBody(newBody);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectorValue]);

  const onSave = async () => {
    await addNewCategory(requestBody);
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
        <OldInput
          label="Назва нової категорії :"
          name="name"
          placeholder="Введіть назву нової категорії"
          onChange={onInputChange}
        />
        <OldInput
          label="ID нової категорії :"
          name="id"
          length="md"
          onChange={onInputChange}
        />
        <OldInput
          type="checkbox"
          label="Зробити підкатегорією :"
          placeholder="Введіть назву нової категорії"
          additionalFunction={toggleSelectorShown}
        />

        {selectorIsShown && (
          <Selector
            name="parentId"
            label=""
            data={data}
            // data={[{ name: '1' }, { name: '2' }, { name: '3' }, { name: '4' }]}
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
