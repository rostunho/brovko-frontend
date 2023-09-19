import { useState } from 'react';
import Heading from 'shared/components/Heading';
import Selector from 'shared/components/Selector';
import Input from 'shared/components/Input';
import styles from './DeliveryForm.module.scss';

// testing fields
import NewInput from 'shared/components/NewInput';
// testing fields

export default function DeliveryForm() {
  const [selectedRadioButton, setSelectedRadioButton] = useState('Відділення');

  return (
    <div className={styles.container}>
      <Heading type="h3">Доставка</Heading>

      <form>
        <Selector
          label="Населений пункт"
          placeholder="Оберіть населений пункт"
          data={[
            { name: 'Місто 1' },
            { name: 'Місто 2' },
            { name: 'Місто 3' },
            { name: 'Місто 4' },
            { name: 'Місто 5' },
          ]}
          hotOptionsData={[
            'Київ',
            'Львів',
            'Харків',
            'Дніпро',
            'Одеса',
            'Запоріжжя',
          ]}
        />

        <Input
          type="radio"
          name="test-name"
          value="Відділення"
          checked={selectedRadioButton === 'Відділення'}
          onChange={() => {
            setSelectedRadioButton('Відділення');
          }}
          label="Доставка до відділення Нової Пошти"
        />
        <Input
          type="radio"
          name="test-name"
          value="Поштомат"
          checked={selectedRadioButton === 'Поштомат'}
          onChange={() => {
            setSelectedRadioButton('Поштомат');
          }}
          label="Доставка у поштомат Нової Пошти"
        />
        <Input
          type="radio"
          name="test-name"
          value="Адреса"
          checked={selectedRadioButton === 'Адреса'}
          onChange={() => {
            setSelectedRadioButton('Адреса');
          }}
          label="Доставка Новою Поштою за адресою"
        />
        <input type="radio" />
        <Input type="checkbox" label="Test" />

        {/* testing start */}
        <br />
        <br />
        <br />
        <br />

        <NewInput
          type="text"
          label="Test LG Text Input"
          placeholder="Введіть назву міста"
          length="md"
        />
        <NewInput
          type="email"
          name="email"
          label="Test MD Input"
          placeholder="Enter your E-mail"
        />
        <NewInput
          type="text"
          label="Test SM"
          placeholder="Text of placeholder"
          length="sm"
        />

        {/* testing end */}
      </form>
    </div>
  );
}
