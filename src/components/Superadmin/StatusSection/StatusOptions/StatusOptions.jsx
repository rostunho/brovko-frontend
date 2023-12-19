import Heading from 'shared/components/Heading';
import Input from 'shared/components/Input';

import styles from './StatusOptions.module.scss';

const StatusOptions = ({ toggleStatusToShow }) => {
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
            type="radio"
            name="status"
            label="покупці"
            value="customer"
            onChange={selectStatus}
          />
        </li>
        <li className={styles.item}>
          <Input
            type="radio"
            name="status"
            label="менеджери"
            value="manager"
            onChange={selectStatus}
          />
        </li>
        <li className={styles.item}>
          <Input
            type="radio"
            name="status"
            label="суперадміни"
            value="superadmin"
            onChange={selectStatus}
          />
        </li>
      </ul>
    </>
  );
};

export default StatusOptions;
