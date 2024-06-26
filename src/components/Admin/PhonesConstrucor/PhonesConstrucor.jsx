import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addPopupOperation } from 'redux/popup/popupOperations';
import { parsePhoneNumber } from 'utils';
import Input from 'shared/components/Input';
import LineQuantittyButtons from '../LineQuantittyButtons/LineQuantittyButtons';

import styles from './PhonesConstrucor.module.scss';

export default function PhonesConstrucor({
  defaultData,
  extractData,
  ...props
}) {
  const [initialData, setInitialData] = useState(null);
  const [phones, setPhones] = useState(['']);
  const dispatch = useDispatch();

  useEffect(() => {
    if (defaultData && defaultData.length > 0) {
      setInitialData([...defaultData]);
    }
  }, [defaultData]);

  useEffect(() => {
    if (initialData && initialData.join(', ') !== '') {
      const arrayToCompare = [...initialData];

      if (JSON.stringify(arrayToCompare) !== JSON.stringify(phones)) {
        setPhones(prevPhones => [...initialData]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialData]);

  useEffect(() => {
    extractData && extractData([...phones]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phones]);

  const handleOnChange = event => {
    const {
      dataset: { idx },
      value,
    } = event.target;

    setPhones(prevRows => {
      const newRows = [...prevRows];
      newRows[idx] = parsePhoneNumber(value);

      return newRows;
    });
  };

  const addPhone = () => {
    setPhones(prevPhones => {
      const newPhones = [...prevPhones];
      newPhones.push('');
      return newPhones;
    });
  };

  const removePhone = () => {
    if (phones.length < 2) {
      dispatch(
        addPopupOperation('Це останній телефон. Вкажи хоча б один.', 'warning')
      );
      return;
    }
    setPhones(prevPhones => {
      const newPhones = [...prevPhones];
      newPhones.pop();
      return newPhones;
    });
  };

  return (
    <div>
      <p className={styles.label}>Телефон :</p>
      <ul className={styles['phones-list']}>
        {phones.map((phone, idx) => {
          return (
            <li key={idx}>
              <Input
                type="tel"
                name={`phone-${idx}`}
                data-idx={idx}
                value={phone}
                onChange={handleOnChange}
              />
            </li>
          );
        })}
      </ul>
      <LineQuantittyButtons
        addLabel="Додати телефон"
        removeLabel="Забрати телефон"
        addAction={addPhone}
        removeAction={removePhone}
      />
    </div>
  );
}
