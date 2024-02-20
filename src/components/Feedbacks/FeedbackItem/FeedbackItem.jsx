import Image from 'shared/components/Image';
import UserLight from 'shared/icons/UserLight';
import styles from './FeedbackItem.module.scss';

export default function FeedbackItem({ feedback, ...props }) {
  return (
    <li className={styles.item}>
      <div className={styles.heading}>
        <Image className={styles.avatar} width="40" height="40" />
        <div className={styles.author}>
          <div className={styles.info}>
            <p className={styles.label}>Пише :</p>
            <p className={styles.name}>
              {feedback?.name || 'Імені не вказано'}
            </p>
          </div>
          <div className={styles.info}>
            <p className={styles.label}>З пошти :</p>
            <p className={styles.name}>
              {feedback?.email || 'Імені не вказано'}
            </p>
          </div>
          <div className={styles.info}>
            <p className={styles.label}>Телефон :</p>
            <p className={styles.name}>
              {feedback?.phone || 'Імені не вказано'}
            </p>
          </div>
        </div>
      </div>
      <p className={styles.message}>{feedback?.text}</p>
    </li>
  );
}
