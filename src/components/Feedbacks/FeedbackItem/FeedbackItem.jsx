import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getUserByEmail } from 'shared/services/api/brovko/user';
import { updateFeedbackStatus } from 'shared/services/api/brovko/feedback';
import UserLight from 'shared/icons/UserLight';
import Button from 'shared/components/Button';
import styles from './FeedbackItem.module.scss';

export default function FeedbackItem({ feedback, ...props }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const status = searchParams.get('feedbacks');
  const avatarURL = feedback.user?.avatarURL;

  return (
    <li
      className={`${styles.item} ${
        status === 'archived' ? styles.archived : ''
      }`}
    >
      <div className={styles.heading}>
        {avatarURL && avatarURL !== '' ? (
          <img
            className={styles.avatar}
            src={avatarURL}
            alt="avatar"
            width="40px"
            height="40px"
          />
        ) : (
          <div className={styles['default-avatar-thumb']}>
            <UserLight width={40} heigth={40} />
          </div>
        )}
        <div className={styles.author}>
          {feedback.isLogin && (
            <span className={styles.registred}>Зареєстрований</span>
          )}
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
      {status === 'all' || status === 'new'
        ? feedback.status !== 'archived' && (
            <Button
              admin
              className={styles.button}
              onClick={() => updateFeedbackStatus(feedback._id, 'archived')}
            >
              Опрацьовано
            </Button>
          )
        : null}
    </li>
  );
}
