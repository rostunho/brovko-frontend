import styles from './RegisterForm.module.scss';

const UserConsent = () => {
  return (
    <>
      <p className={styles.text}>
        Реєструючись, ви погоджуєтеся з умовами {''}
        <a className={styles.link} href="/all/personal-data-protection">
          положення про обробку і захист персональних даних {''}
        </a>
        та
        <a className={styles.link} href="/all/user-agreement">
          {''} угодою користувача
        </a>
      </p>
    </>
  );
};

export default UserConsent;
