import Heading from 'shared/components/Heading';
import Image from 'shared/components/Image';

import styles from './UserFound.module.scss';

const UserFound = ({ userFound }) => {
  const noData = '...користувач не уточнив :(';
  return (
    <div className={styles.wrapper}>
      <Heading type="h2">Користувач, якого вдалося знайти:</Heading>
      <div className={styles.imgWrapper}>
        <Image
          className={styles.avatar}
          src={userFound.avatarURL && userFound.avatarURL}
          text={userFound.firstName || userFound.email}
        />
      </div>
      <p>Прізвище: {userFound.lastName || noData}</p>
      <p>Ім'я: {userFound.firstName || noData}</p>
      <p>По-батькові: {userFound.middleName || noData}</p>
      <p>Номер телефону: {userFound.phone || noData}</p>
      <Heading type="h3">Статус: {userFound.status || noData}</Heading>
    </div>
  );
};

export default UserFound;
