import { useState, useEffect } from 'react';
import Button from 'shared/components/Button';
import styles from './CommentMaker.module.scss';

export default function CommentMaker({ productId, ...props }) {
  const [isFullView, setIsFullView] = useState(false);

  return (
    <>
      {!isFullView && (
        <>
          <p className={styles.prompt}>
            Ваші відгуки допоможуть іншим у виборі смаколика для свого
            улюбленця!
          </p>
          <Button
            size="lg"
            mode="outlined"
            className={styles['expand-button']}
            onClick={() => setIsFullView(true)}
          >
            Залишити відгук
          </Button>
        </>
      )}
    </>
  );
}
