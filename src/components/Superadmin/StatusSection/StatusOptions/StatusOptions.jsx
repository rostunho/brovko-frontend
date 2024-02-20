import Heading from 'shared/components/Heading';
import Input from 'shared/components/Input';

import styles from './StatusOptions.module.scss';

const StatusOptions = ({ toggleStatusToShow, selectedStatus }) => {
  const selectStatus = e => {
    const { value } = e.target;
    toggleStatusToShow(value);
  };

  return (
    <>
      <Heading type="h3">Знайти всіх користувачів за статусом</Heading>
      <ul className={styles.list}>
        <li className={styles.item}>
          <Input
            className={styles.input}
            type="radio"
            name="status"
            label="покупці"
            value="customer"
            onChange={selectStatus}
            defaultChecked={selectedStatus === 'customer'}
          />
        </li>
        <li className={styles.item}>
          <Input
            className={styles.input}
            type="radio"
            name="status"
            label="менеджери"
            value="manager"
            onChange={selectStatus}
            defaultChecked={selectedStatus === 'manager'}
          />
        </li>
        <li className={styles.item}>
          <Input
            className={styles.input}
            type="radio"
            name="status"
            label="суперадміни"
            value="superadmin"
            onChange={selectStatus}
            defaultChecked={selectedStatus === 'superadmin'}
          />
        </li>
      </ul>
    </>
  );
};

export default StatusOptions;
