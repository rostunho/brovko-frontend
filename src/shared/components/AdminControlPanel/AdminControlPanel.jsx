import { useState } from 'react';
import { createPortal } from 'react-dom';
import Button from '../Button';
import { EditIcon, DeleteIcon, ViewIcon, AddIcon } from 'shared/icons/Admin';
import styles from './AdminControlPanel.module.scss';

export default function AdminControlPanel({
  viewMode,
  editDisabled,
  deleteDisabled,
  onAddClick,
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
            <button
              admin
              className={styles.button}
              //   size="md"
              //   disabled={editDisabled}
              onClick={onAddClick}
            >
              <AddIcon
                size={40}
                iconColor="#fefefe"
                borderColor="transparent"
              />
            </button>
          </li>
          <li className={styles['buttons-item']}>
            <button
              admin
              className={styles.button}
              //   size="md"
              disabled={editDisabled}
              onClick={onEditClick}
            >
              <EditIcon
                size={40}
                iconColor="#fefefe"
                borderColor="transparent"
              />
            </button>
          </li>
          <li className={styles['buttons-item']}>
            <button
              admin
              className={styles.button}
              size="md"
              disabled={deleteDisabled}
              onClick={onDeleteClick}
            >
              <DeleteIcon
                size={40}
                iconColor="#fefefe"
                borderColor="transparent"
              />
            </button>
          </li>
          <li className={styles['buttons-item']}>
            <button
              admin
              className={styles.button}
              size="md"
              onClick={handleViewMode}
            >
              <ViewIcon
                size={40}
                iconColor="#fefefe"
                borderColor="transparent"
              />
            </button>
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
