import Image from 'shared/components/Image';

import styles from './ListByStatusItem.module.scss';

const ListByStatusItem = ({ user }) => {
  return (
    <div className={styles.container}>
      <div className={styles.imgWrapper}>
        <Image
          className={styles.avatar}
          src={user.avatarURL && user.avatarURL}
          text={user.firstName || user.email}
        />
      </div>
      <div>
        <p>{user.email}</p>
        <div className={styles.name}>
          <p>{user.firstName || "/Ім'я не вказано/"}</p>
          <p>{user.lastName || '/Прізвище не вказано/'}</p>
        </div>
        <p>{user.phone || '/Номер тел не вказано/'}</p>
      </div>
    </div>
  );
};

export default ListByStatusItem;
