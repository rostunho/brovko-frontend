import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useScreen } from 'shared/hooks/useScreen';
import useScroll from 'shared/hooks/useScroll';
import useFadeOut from 'shared/hooks/useFadeOut';
import BottomControls from './BottomControls/BottomControls';
import { EditIcon, DeleteIcon, ViewIcon, AddIcon } from 'shared/icons/Admin';
import styles from './AdminControlPanel.module.scss';

export default function AdminControlPanel({
  simple,
  editDisabled,
  deleteDisabled,
  onAddClick,
  onEditClick,
  onDeleteClick,
  onViewModeClick,
}) {
  const [customerMode, setCustomerMode] = useState(false);
  const [showBottomMenu, fadeOut, setShowBottomMenu] = useFadeOut(500);
  const scroll = useScroll();
  const { isMobile, screenWidth } = useScreen();

  useEffect(() => {
    setShowBottomMenu(isMobile && scroll >= 700);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile, scroll]);

  const handleViewMode = () => {
    setCustomerMode(!customerMode);
    onViewModeClick && onViewModeClick();
  };

  return (
    <>
      {!customerMode ? (
        <>
          <ul className={styles['buttons-list']}>
            {!simple && (
              <li className={styles['buttons-item']}>
                <button admin className={styles.button} onClick={onAddClick}>
                  <span className={styles['icon-wrapper']}>
                    <AddIcon
                      size={40}
                      iconColor="#fefefe"
                      borderColor="transparent"
                    />
                  </span>
                  {!isMobile && 'Додати'}
                </button>
              </li>
            )}
            <li className={styles['buttons-item']}>
              <button
                admin
                className={`${styles.button} ${
                  simple ? styles['simple-mode'] : ''
                }`}
                disabled={editDisabled}
                onClick={onEditClick}
              >
                <span className={styles['icon-wrapper']}>
                  <EditIcon
                    size={40}
                    iconColor="#fefefe"
                    borderColor="transparent"
                  />
                </span>
                {(!isMobile || (simple && screenWidth > 379)) && 'Редагувати'}
              </button>
            </li>
            <li className={styles['buttons-item']}>
              <button
                admin
                className={`${styles.button} ${
                  simple ? styles['simple-mode'] : ''
                }`}
                size="md"
                disabled={deleteDisabled}
                onClick={onDeleteClick}
              >
                <span className={styles['icon-wrapper']}>
                  <DeleteIcon
                    size={40}
                    iconColor="#fefefe"
                    borderColor="transparent"
                  />
                </span>
                {(!isMobile || (simple && screenWidth > 379)) && 'Видалити'}
              </button>
            </li>
            {!simple && (
              <li className={styles['buttons-item']}>
                <button
                  admin
                  className={styles.button}
                  size="md"
                  onClick={handleViewMode}
                >
                  <span className={styles['icon-wrapper']}>
                    <ViewIcon
                      size={40}
                      iconColor="#fefefe"
                      borderColor="transparent"
                    />
                  </span>
                  {!isMobile && 'Переглянути, як покупець'}
                </button>
              </li>
            )}
          </ul>

          {showBottomMenu &&
            createPortal(
              <BottomControls
                onAddClick={onAddClick}
                editDisabled={editDisabled}
                onEditClick={onEditClick}
                deleteDisabled={deleteDisabled}
                onDeleteClick={onDeleteClick}
                handleViewMode={handleViewMode}
                animation={fadeOut}
              />,
              document.getElementById('service-root')
            )}
        </>
      ) : (
        createPortal(
          <button
            admin
            className={`${styles.button} ${styles['portal-button']}`}
            size="md"
            onClick={handleViewMode}
          >
            <span className={styles['icon-wrapper']}>
              <ViewIcon
                size={40}
                iconColor="#fefefe"
                borderColor="transparent"
              />
            </span>
          </button>,
          document.getElementById('modal-root')
        )
      )}
    </>
  );
}
