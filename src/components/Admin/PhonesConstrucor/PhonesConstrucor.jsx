import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addPopupOperation } from 'redux/popup/popupOperations';
import { parsePhoneNumber, toPhoneFormat } from 'utils';
import Input from 'shared/components/Input';
import AddingPlusIcon from 'shared/icons/AddingPlusIcon';
import AddingMinusIcon from 'shared/icons/AddingMinusIcon';
import styles from './PhonesConstrucor.module.scss';

export default function PhonesConstrucor({ extractData, ...props }) {
  const [phones, setPhones] = useState([{ tel: '' }]);
  const dispatch = useDispatch();

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
      newRows[idx].tel = parsePhoneNumber(value);

      return newRows;
    });
  };

  const addPhone = () => {
    setPhones(prevPhones => {
      const newPhones = [...prevPhones];
      newPhones.push({ tel: '' });
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
                value={phone[idx]}
                onChange={handleOnChange}
              />
            </li>
          );
        })}
      </ul>
      <ul className={styles['buttons-list']}>
        <button
          type="button"
          className={styles['quantity-button']}
          onClick={removePhone}
        >
          <AddingMinusIcon />
          Забрати телефон
        </button>
        <button
          type="button"
          className={styles['quantity-button']}
          onClick={addPhone}
        >
          Додати телефон
          <AddingPlusIcon />
        </button>
      </ul>
    </div>
  );
}
