import { useState } from 'react';

import ListByStatusItem from './ListByStatusItem';

import styles from './ListByStatus.module.scss';

const ListByStatus = ({ list }) => {
  const [selected, setSelected] = useState('');

  const onToggleSelect = data => {
    setSelected(data);
  };

  return (
    <>
      {list && (
        <ul className={styles.container}>
          {list.map(item => (
            <li key={item._id} className={styles.itemContainer}>
              <ListByStatusItem
                user={item}
                selected={selected}
                onToggleSelect={onToggleSelect}
              />
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default ListByStatus;
