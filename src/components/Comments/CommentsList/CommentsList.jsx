import { useState, useEffect, useRef } from 'react';

import NewReviewItem from 'shared/components/NewReviewItem/NewReviewItem';
import styles from './CommentsList.module.scss';

export default function CommentsList({
  reviews,
  param,
  isMobile,
  listHeight,
  ...props
}) {
  const [isScrollbarVisible, setIsScrollbarVisible] = useState(false);

  const listRef = useRef();

  useEffect(() => {
    listRef.current.scrollHeight > listRef.current.clientHeight
      ? setIsScrollbarVisible(true)
      : setIsScrollbarVisible(false);
  }, [listRef.current?.clientHeight, listRef.current?.scrollHeight]);

  return (
    <ul
      ref={listRef}
      className={`${styles.list} ${
        isScrollbarVisible ? styles['scrollbar'] : ''
      }`}
      style={{ height: listHeight }}
    >
      {param === 'all' || !isMobile
        ? reviews &&
          reviews.length > 0 &&
          reviews.map((review, idx) => {
            return (
              <NewReviewItem
                key={idx}
                review={review}
                mode="approved"
                className={isScrollbarVisible ? styles['visible-scroll'] : ''}
              />
            );
          })
        : reviews &&
          reviews.length > 0 && (
            <NewReviewItem review={reviews[0]} mode="approved" />
          )}
    </ul>
  );
}
