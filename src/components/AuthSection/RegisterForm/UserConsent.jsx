import styles from './RegisterForm.module.scss';

const UserConsent = () => {
  return (
    <>
      <p className={styles.text}>
        Реєструючись, ви погоджуєтеся з умовами {''}
        <a className={styles.link} href="/all/privacy-policy">
          положення про обробку і захист персональних даних {''}
        </a>
        та
        <a className={styles.link} href="/all/public-offer">
          {''} угодою користувача
        </a>
      </p>
    </>
  );
};

export default UserConsent;
