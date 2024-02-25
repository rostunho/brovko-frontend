import { useState } from 'react';
import { createPortal } from 'react-dom';
import Button from '../Button';
import styles from './AdminControlPanel.module.scss';

export default function AdminControlPanel({
  viewMode,
  editDisabled,
  deleteDisabled,
  onEditClick,
  onDeleteClick,
  onViewModeClick,
}) {
  const [customerMode, setCustomerMode] = useState(false);

  const handleViewMode = () => {
    setCustomerMode(!customerMode);
    onViewModeClick && onViewModeClick();
  };

  return (
    <>
      {!customerMode ? (
        <ul className={styles['buttons-list']}>
          <li className={styles['buttons-item']}>
            <Button
              admin
              className={styles.button}
              size="lg"
              disabled={editDisabled}
              onClick={onEditClick}
            >
              Редагувати
            </Button>
          </li>
          <li className={styles['buttons-item']}>
            <Button
              admin
              className={styles.button}
              size="lg"
              disabled={deleteDisabled}
              onClick={onDeleteClick}
            >
              Видалити
            </Button>
          </li>
          <li className={styles['buttons-item']}>
            <Button
              admin
              className={styles.button}
              size="lg"
              onClick={handleViewMode}
            >
              Подивитись, як покупець
            </Button>
          </li>
        </ul>
      ) : (
        createPortal(
          <Button
            className={styles['portal-button']}
            admin
            onClick={handleViewMode}
          >
            Повернутись в режим адміна
          </Button>,
          document.getElementById('service-root')
        )
      )}
    </>
  );
}
