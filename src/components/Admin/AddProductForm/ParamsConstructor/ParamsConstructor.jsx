import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addPopupOperation } from 'redux/popup/popupOperations';
import DropdownArrowIcon from 'shared/icons/DropdownArrowIcon';
import Prompt from 'shared/components/Prompt';
import LineQuantittyButtons from 'components/Admin/LineQuantittyButtons/LineQuantittyButtons';
import styles from './ParamsConstructor.module.scss';

export default function ParamsConstructor({ initialParams, extractData }) {
  const [showParams, setShowParams] = useState(false);
  const [titleRow, setTitleRow] = useState({ key: 'Заголовок :', value: '' });
  const [rows, setRows] = useState(
    initialParams || [titleRow, { key: '', value: '' }]
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (initialParams && initialParams.length > 0) {
      setRows([...initialParams]);
      setShowParams(true);
    }
  }, [initialParams]);

  useEffect(() => {
    extractData && rows.length >= 2 && extractData(rows);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rows]);

  const handleShowParams = () => {
    if (rows.length > 2) {
      dispatch(
        addPopupOperation(
          'Спочатку видали непотрібні характеристики.',
          'warning'
        )
      );
      return;
    }

    if (!showParams) {
      setShowParams(true);
    } else {
      setTitleRow({ key: 'Заголовок', value: '' });
      setRows([titleRow, { key: '', value: '' }]);
      setShowParams(false);
    }
  };

  const handleOnChange = event => {
    const {
      dataset: { idx },
      name,
      value,
    } = event.target;

    setRows(prevRows => {
      const newRows = [...prevRows];
      newRows[idx][name] = value;

      return newRows;
    });
  };

  const addRow = () => {
    setRows(prevRows => {
      const newRows = [...prevRows];
      newRows.push({ key: '', value: '' });
      return newRows;
    });
  };

  const removeRow = () => {
    if (rows.length < 2) {
      dispatch(
        addPopupOperation(
          'Більше немає характеристик для видалення. Спочатку додай яку-небудь.',
          'warning'
        )
      );
      return;
    }
    setRows(prevRows => {
      const newRows = [...prevRows];
      newRows.pop();
      return newRows;
    });
  };

  return (
    <>
      <div className={styles.heading}>
        <button
          type="button"
          className={styles['dropdown-button']}
          onClick={handleShowParams}
        >
          <DropdownArrowIcon
            size={24}
            className={styles['dropdown-icon']}
            style={{
              rotate: showParams ? '-180deg' : '0deg',
              transition: 'all 0.25s ease 0s',
            }}
          />
          Характеристики
        </button>
        {showParams && (
          <Prompt className={styles.prompt} messageStyle={{ bottom: '100%' }}>
            Порожній заголовок на cторінці товару не відображатиметься
          </Prompt>
        )}
      </div>
      {showParams && (
        <div>
          <ul
            className={styles['fields-list']}
            // onBlur={() => console.log('PARAMS CONTAINER ON BLUR')}
          >
            {rows.map((row, idx) => {
              return (
                <li key={idx} className={styles.item}>
                  <input
                    className={styles.input}
                    name="key"
                    data-idx={idx}
                    value={rows[idx].key}
                    onChange={handleOnChange}
                  />
                  <input
                    className={styles.input}
                    name="value"
                    data-idx={idx}
                    value={rows[idx].value}
                    onChange={handleOnChange}
                  />
                </li>
              );
            })}
          </ul>
          <LineQuantittyButtons
            addLabel="Додати позицію"
            addAction={addRow}
            removeLabel="Забрати позицію"
            removeAction={removeRow}
          />
          {/* <ul className={styles['buttons-list']}>
            <button
              type="button"
              className={styles['quantity-button']}
              onClick={removeRow}
            >
              <AddingMinusIcon />
              Забрати позицію
            </button>
            <button
              type="button"
              className={styles['quantity-button']}
              onClick={addRow}
            >
              Додати позицію
              <AddingPlusIcon />
            </button>
          </ul> */}
        </div>
      )}
    </>
  );
}
