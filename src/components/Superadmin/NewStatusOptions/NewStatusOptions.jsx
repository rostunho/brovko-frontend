import { useState, useEffect } from 'react';

import Input from 'shared/components/Input';
import Heading from 'shared/components/Heading';

import styles from './NewStatusOptions.module.scss';

const NewStatusOptions = ({ oldStatus, setNewStatus }) => {
  const [options, setOptions] = useState([]);

  const selectStatus = e => {
    const { value } = e.target;
    setNewStatus(value);
  };

  useEffect(() => {
    switch (oldStatus) {
      case 'customer':
        setOptions([
          {
            description: 'Ця людина достойна бути адміном',
            role: 'manager',
          },
          {
            description: 'Найвища честь стати суперадміном',
            role: 'superadmin',
          },
        ]);
        setNewStatus('manager');
        break;

      case 'manager':
        setOptions([
          {
            description: 'Нехай просто купує в нас смаколики',
            role: 'customer',
          },
          {
            description: 'Найвища честь стати суперадміном',
            role: 'superadmin',
          },
        ]);
        setNewStatus('customer');
        break;

      case 'superadmin':
        setOptions([
          {
            description: 'Ця людина достойна бути лише адміном',
            role: 'manager',
          },
          {
            description: 'Тепер він просто покупець',
            role: 'customer',
          },
        ]);
        setNewStatus('manager');
        break;

      case '':
        setOptions([
          {
            description: 'Нехай просто купує в нас смаколики',
            role: 'customer',
          },
          {
            description: 'Ця людина достойна бути адміном',
            role: 'manager',
          },
          {
            description: 'Найвища честь стати суперадміном',
            role: 'superadmin',
          },
        ]);
        setNewStatus('customer');
        break;

      default:
        console.log('Invalid oldStatus type');
    }
  }, [oldStatus]);

  return (
    <>
      {options.length && (
        <>
          <Heading type="h3">Надати користувачу нового статусу?</Heading>

          <ul className={styles.list}>
            <li className={styles.item}>
              <Input
                className={styles.input}
                type="radio"
                name="newstatus"
                label={options[0].description}
                value={options[0].role}
                onChange={selectStatus}
              />
            </li>
            <li className={styles.item}>
              <Input
                className={styles.input}
                type="radio"
                name="newstatus"
                label={options[1].description}
                value={options[1].role}
                onChange={selectStatus}
              />
            </li>
            {options[2] && (
              <li className={styles.item}>
                <Input
                  type="radio"
                  name="newstatus"
                  label={options[2].description}
                  value={options[2].role}
                  onChange={selectStatus}
                />
              </li>
            )}
          </ul>
        </>
      )}
    </>
  );
};

export default NewStatusOptions;
