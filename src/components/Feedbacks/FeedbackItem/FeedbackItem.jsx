import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { getUserByEmail } from 'shared/services/api/brovko/user';
import UserLight from 'shared/icons/UserLight';
import styles from './FeedbackItem.module.scss';

export default function FeedbackItem({ feedback, ...props }) {
  const [author, setAuthor] = useState(null);

  useEffect(() => {
    (async () => {
      const { user } = await getUserByEmail(feedback?.email);
      user && setAuthor({ ...user });
    })();
  }, []);

  return (
    <li className={styles.item}>
      <div className={styles.heading}>
        {author?.avatarURL ? (
          <img
            className={styles.avatar}
            src={author?.avatarURL}
            alt="avatar"
            width="40px"
            height="40px"
            locked
          />
        ) : (
          <div className={styles['default-avatar-thumb']}>
            <UserLight width={40} heigth={40} />
          </div>
        )}
        <div className={styles.author}>
          {author && <span className={styles.registred}>Зареєстрований</span>}
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
