import BackToTopIcon from 'shared/icons/BackToTopIcon';
import styles from './BackToTopButton.module.scss';

export default function BackToTopButton(props) {
  return (
    <button className={`${styles['to-top-button']} `}>
      <BackToTopIcon className={styles['to-top-icon']} />
    </button>
  );
}
