import { useEffect, forwardRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import Button from 'shared/components/Button';
import NewAddReviewForm from './NewAddReviewForm/NewAddReviewForm';
import styles from './CommentMaker.module.scss';

// export default function CommentMaker({ productId, ...props })

const CommentMaker = forwardRef(({ productId, ...props }, ref) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const isFullView = searchParams.get('add-comment');

  useEffect(() => {
    setInitialSearchParams('add-comment', false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const setInitialSearchParams = (param, value) => {
    const targetParam = searchParams.get(param);

    !targetParam &&
      setSearchParams(prevParams => {
        prevParams.set(param, value);
        return prevParams;
      });
  };

  const hanldeAddCommentParam = value => {
    setSearchParams(prevParams => {
      prevParams.set('add-comment', value);
      return prevParams;
    });
  };

  return (
    <div
      ref={ref}
      className={`${styles.container} ${isFullView ? styles['full-view'] : ''}`}
    >
      {isFullView !== 'true' && (
        <>
          <p className={styles.prompt}>
            Ваші відгуки допоможуть іншим у виборі смаколика для свого
            улюбленця!
          </p>
          <Button
            size="lg"
            mode="outlined"
            onClick={() => hanldeAddCommentParam(true)}
          >
            Залишити відгук
          </Button>
        </>
      )}
      {isFullView === 'true' && (
        <NewAddReviewForm onClose={() => hanldeAddCommentParam(false)} />
      )}
    </div>
  );
});

export default CommentMaker;
