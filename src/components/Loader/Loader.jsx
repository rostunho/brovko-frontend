import styles from './loader.module.scss';
import paw from './spiner_paw.svg';

const Spiner = () => {
  return (
    <div className={styles.paw}>
      <img src={paw} alt="Your paw" />
    </div>
  );
};

export default Spiner;