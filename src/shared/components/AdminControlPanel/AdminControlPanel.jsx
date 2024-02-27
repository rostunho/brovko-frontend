import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useScreen } from 'shared/hooks/useScreen';
import useScreenWidth from 'shared/hooks/useScreenWidth';
import useScroll from 'shared/hooks/useScroll';
import useFadeOut from 'shared/hooks/useFadeOut';
import Button from '../Button';
import BottomControls from './BottomControls/BottomControls';
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
  const [showToTopButton, fadeOut, setShowToTopButton] = useFadeOut(500);
  const scroll = useScroll();
  const { isMobile } = useScreen();

  useEffect(() => {
    setShowToTopButton(isMobile && scroll >= 700);
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
            <li className={styles['buttons-item']}>
              <button
                admin
                className={styles.button}
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
                {!isMobile && 'Редагувати'}
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
                <span className={styles['icon-wrapper']}>
                  <DeleteIcon
                    size={40}
                    iconColor="#fefefe"
                    borderColor="transparent"
                  />
                </span>
                {!isMobile && 'Видалити'}
              </button>
            </li>
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
          </ul>

          {showToTopButton &&
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
          <Button
            className={styles['portal-button']}
            admin
            onClick={handleViewMode}
          >
            Повернутись в режим адміна
          </Button>,
          document.getElementById('modal-root')
        )
      )}
    </>
  );
}
