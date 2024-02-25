import { useState } from 'react';
import {
  AddIcon,
  EditIcon,
  DeleteIcon,
  ViewIcon,
  MoreIcon,
} from 'shared/icons/Admin';
import styles from './BottomControls.module.scss';

export default function BottomControls({ ...props }) {
  const {
    onAddClick,
    editDisabled,
    onEditClick,
    deleteDisabled,
    onDeleteClick,
    handleViewMode,
    animation,
  } = props;
  const [showAllButtons, setShowAllButtons] = useState(false);

  return (
    <ul
      className={`${styles['buttons-bottom-list']} ${
        animation ? styles['fade-out'] : ''
      }`}
    >
      {showAllButtons && (
        <>
          <li className={styles['buttons-item']}>
            <button admin className={styles.button} onClick={onAddClick}>
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
        </>
      )}
      <li className={styles['buttons-item']}>
        <button
          admin
          className={styles.button}
          size="md"
          onClick={() => setShowAllButtons(!showAllButtons)}
        >
          <MoreIcon size={40} iconColor="#fefefe" borderColor="transparent" />
        </button>
      </li>
    </ul>
  );
}
