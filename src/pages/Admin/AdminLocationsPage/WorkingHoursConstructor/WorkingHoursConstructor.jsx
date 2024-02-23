import { useState } from 'react';
import Input from 'shared/components/Input';
import styles from './WorkingHoursConstructor.module.scss';

export default function WorkingHoursConstructor() {
  const [lines, setLines] = useState([{ days: '', hours: '' }]);

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

  return (
    <div>
      <p className={styles.label}>Час роботи :</p>
      <ul>
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
    </div>
  );
}
