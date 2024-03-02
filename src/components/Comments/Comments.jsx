import { useState, useEffect, useRef } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { getReviewsByProductId } from 'shared/services/api/brovko';
import CommentMaker from './CommentMaker/CommentMaker';
import CommentsList from './CommentsList/CommentsList';
import ReadMoreButton from 'pages/NewProductDetailPage/ReadMoreButton/ReadMoreButton';
import styles from './Comments.module.scss';

export default function Comments({
  containerHeight,
  isMobile,
  onUpdateCommentsLength,
}) {
  const { productId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentReviews, setCurrentReviews] = useState([]);
  const [listHeight, setListHeight] = useState(null);
  const commentsParam = searchParams.get('comments');
  const makerView = searchParams.get('add-comment');

  const titleRef = useRef();
  const makerRef = useRef();

  useEffect(() => {
    setInitialCommentsParam('last');

    (async () => {
      // if (!commentsParam) {
      //   return;
      // } // неактуально після зміни умов рендерингу компонента
      const originalReviews = await getReviewsByProductId(productId);
      const { comments } = originalReviews[0] || { comments: [] };
      const adaptedReviews = processOriginalReviews(comments);
      setCurrentReviews([...adaptedReviews]);
      onUpdateCommentsLength(adaptedReviews.length);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!containerHeight) {
      return;
    }

    const titleHeight = titleRef.current.clientHeight;
    const makerHeight = makerRef.current.clientHeight;

    setListHeight(containerHeight - titleHeight - makerHeight - 20); // "-20" - вирівнювання на верхній паддінг контейнера списку
  }, [containerHeight, makerView]);

  const processOriginalReviews = comments => {
    return comments
      .filter(review => review.text.status.approved === true)
      .map(review => {
        // console.log('review :>> ', review);
        const adaptedReview = {};
        adaptedReview.owner = review.owner;
        adaptedReview.createdAt = review.text.createdAt;
        adaptedReview.text = review.text.text;
        adaptedReview.reviewURL = review.text.reviewURL;
        adaptedReview.status = review.text.status;

        return adaptedReview;
      });
  };

  const setInitialCommentsParam = value => {
    const existingCommentsParam = commentsParam;
    const existingSearchParams = Object.fromEntries(searchParams.entries());

    if (existingCommentsParam) {
      // console.log('existingSearchParams :>> ', existingSearchParams);
      setSearchParams(
        {
          ...existingSearchParams,
          comments: existingCommentsParam,
        },
        { replace: true }
      );
    } else {
      setSearchParams(
        { ...existingSearchParams, comments: value },
        { replace: true }
      );
    }
  };

  const handleViewMode = () => {
    setSearchParams(
      prevSearchParams => {
        const prevMode = prevSearchParams.get('comments');
        // console.log('prevMode :>> ', prevMode);

        prevMode === 'all'
          ? prevSearchParams.set('comments', 'last')
          : prevSearchParams.set('comments', 'all');

        return prevSearchParams;
      },
      { replace: true }
    );
  };

  return (
    <div className={styles.container}>
      <h3 ref={titleRef} className={styles.title}>
        Відгуки покупців<span>{` (${currentReviews.length})`}</span>
      </h3>

      <CommentMaker ref={makerRef} productId={productId} />

      <CommentsList
        reviews={currentReviews}
        param={commentsParam}
        isMobile={isMobile}
        listHeight={listHeight}
      />

      {isMobile && (
        <ReadMoreButton
          className={styles['read-more']}
          onClick={handleViewMode}
        >
          {commentsParam === 'all'
            ? 'Згорнути відгуки'
            : 'Дивитися всі відгуки'}
        </ReadMoreButton>
      )}
    </div>
  );
}
