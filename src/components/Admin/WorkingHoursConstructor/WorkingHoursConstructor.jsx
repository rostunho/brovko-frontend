import { useState, useEffect } from 'react';
import Input from 'shared/components/Input';
import LineQuantittyButtons from '../LineQuantittyButtons/LineQuantittyButtons';
import styles from './WorkingHoursConstructor.module.scss';

export default function WorkingHoursConstructor({ extractData, ...props }) {
  const [lines, setLines] = useState([{ days: '', hours: '' }]);

  useEffect(() => {
    extractData && extractData(convertData(lines));
    console.log(convertData(lines));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lines]);

  const handleOnchange = event => {
    const {
      dataset: { idx },
      name,
      value,
    } = event.target;

    setLines(prevLines => {
      const newLines = [...prevLines];
      newLines[idx][name] = value;
      return newLines;
    });
  };

  const addLine = () => {
    setLines(prevLines => {
      const newLines = [...prevLines];
      newLines.push({ days: '', hours: '' });
      return newLines;
    });
  };

  const removeLine = () => {
    setLines(prevLines => {
      const newLines = [...prevLines];
      newLines.pop();
      return newLines;
    });
  };

  const convertData = data => {
    const mappedData = {};

    data.map(el => {
      return (mappedData[el.days] = el.hours);
    });

    return mappedData;
  };

  return (
    <div>
      <p className={styles.label}>Час роботи :</p>
      <ul className={styles.list}>
        {lines?.map((line, idx) => {
          return (
            <li key={idx} className={styles['inner-container']}>
              <Input
                name="days"
                className={styles['days-wrapper']}
                inputClassName={styles.days}
                placeholder="дні"
                data-idx={idx}
                value={line.days}
                onChange={handleOnchange}
              />
              <Input
                name="hours"
                className={styles['hours-wrapper']}
                inputClassName={styles.hours}
                placeholder="години"
                data-idx={idx}
                value={line.hours}
                onChange={handleOnchange}
              />
            </li>
          );
        })}
      </ul>
      <LineQuantittyButtons
        addLabel="Додати опцію"
        removeLabel="Забрати опцію"
        addAction={addLine}
        removeAction={removeLine}
      />
    </div>
  );
}