import React from 'react';

import styles from './ProductCardSkeleton.module.scss'; // Стилі для скелетона
import { useSelector } from 'react-redux';
import { selectUserStatus } from 'redux/user/userSelectors';

const ProductCardSkeleton = () => {
  const userStatus = useSelector(selectUserStatus);
  return (
    <>
      <div className={styles.container}>
        <div className={styles.headingSkeleton}></div>
        <div className={styles.inputContainer}>
          <div className={styles.inputSkeleton}></div>
        </div>
        <div className={styles.selectorsContainer}>
          <div className={styles.selectorSkeleton}></div>
          <div className={styles.selectorSkeleton}></div>
        </div>
      </div>
      <div className={styles.doubleRangeSliderSkeleton}></div>

      {(userStatus === 'manager' || userStatus === 'superadmin') && (
        <ul className={styles.buttonList}>
          <li className={styles.button}></li>
          <li className={styles.button}></li>
        </ul>
      )}

      <ul className={styles.list}>
        {Array.from({ length: 12 }).map((_, index) => (
          <li key={index}>
            <div className={styles.c_item}>
              <div className={styles.c_item__top}>
                <div className={styles.c_skeleton_square} />
              </div>
              <div className={styles.wrapper}>
                <div className={styles.c_item__center}>
                  <h3>
                    <div className={styles.c_skeleton_line} />
                    <div className={styles.c_skeleton_line} />
                  </h3>
                </div>
                <div className={styles.c_item__bottom}>
                  <div className={styles.c_skeleton_line} />
                  <div className={styles.c_skeleton_line} />
                </div>
                <div className={styles.c_item__add}>
                  <div className={styles.c_skeleton_square} />
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <ul className={styles.skeletonPagination}>
        <li className={styles.paginationItems}></li>
        <li className={styles.paginationItems}></li>
        <li className={styles.paginationItems}></li>
      </ul>
    </>
  );
};

export default ProductCardSkeleton;
