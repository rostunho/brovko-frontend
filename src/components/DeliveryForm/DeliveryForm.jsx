import { useState } from 'react';
import Heading from 'shared/components/Heading';
import LocationSelector from 'shared/components/LocationSelector';
import Selector from 'shared/components/Selector';
// import OldInput from 'shared/components/OldInput';
import OldInput from 'shared/components/OldInput';
import styles from './DeliveryForm.module.scss';

// testing fields
import Input from 'shared/components/OldInput';
// testing fields

export default function DeliveryForm() {
  const [selectedRadioButton, setSelectedRadioButton] = useState('Відділення');

  return (
    <div className={styles.container}>
      <Heading type="h3">Доставка</Heading>

      <form
        name="delivery-form"
        onSubmit={e => {
          e.preventDefault();
          console.log(e);
        }}
      >
        <LocationSelector />
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

        <button type="submit">TEST SUBMIT</button>
        {/* testing end */}
      </form>
    </div>
  );
}
