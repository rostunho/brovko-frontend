import { useState } from 'react';
import { createPortal } from 'react-dom';
import Button from '../Button';
import { EditIcon, DeleteIcon, ViewIcon } from 'shared/icons/Admin';
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
              <EditIcon
                size={40}
                iconColor="#fefefe"
                borderColor="transparent"
              />
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
              <DeleteIcon
                size={40}
                iconColor="#fefefe"
                borderColor="transparent"
              />
            </Button>
          </li>
          <li className={styles['buttons-item']}>
            <Button
              admin
              className={styles.button}
              size="lg"
              onClick={handleViewMode}
            >
              <ViewIcon
                size={40}
                iconColor="#fefefe"
                borderColor="transparent"
              />
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
