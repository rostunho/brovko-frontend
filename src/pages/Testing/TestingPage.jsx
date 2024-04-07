
import HeartIcon from 'shared/icons/HeartIcon';
import styles from './TestingPage.module.scss';

export default function TestingPage() {

  return (
    <>
      <HeartIcon className={styles.heart} />
      <HeartIcon checked className={styles.heart2} />
    </>
  );
}
