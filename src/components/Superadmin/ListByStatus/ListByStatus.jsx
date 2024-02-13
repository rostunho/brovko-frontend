import ListByStatusItem from './ListByStatusItem';

import styles from './ListByStatus.module.scss';

const ListByStatus = ({ list }) => {
  return (
    <>
      {list && (
        <ul className={styles.container}>
          {list.map(item => (
            <li key={item._id} className={styles.itemContainer}>
              <ListByStatusItem user={item} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default ListByStatus;
