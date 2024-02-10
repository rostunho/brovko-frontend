import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { getReviewsByProductId } from 'shared/services/api/brovko';
import NewReviewItem from 'shared/components/NewReviewItem/NewReviewItem';
import ReadMoreButton from 'pages/NewProductDetailPage/ReadMoreButton/ReadMoreButton';
import styles from './ProductReviewsList.module.scss';

export default function ProductReviewsList() {
  const { productId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const commentsParam = searchParams.get('comments');
  const [currentReviews, setCurrentReviews] = useState([]);

  useEffect(() => {
    setInitialCommentsParam('last');

    (async () => {
      const originalReviews = await getReviewsByProductId(productId);
      const { comments } = originalReviews[0];
      const adaptedReviews = processOriginalReviews(comments);
      setCurrentReviews([...adaptedReviews]);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      setSearchParams({
        ...existingSearchParams,
        comments: existingCommentsParam,
      });
    } else {
      setSearchParams({ ...existingSearchParams, comments: value });
    }
  };

  const handleViewMode = () => {
    setSearchParams(prevSearchParams => {
      const prevMode = prevSearchParams.get('comments');
      console.log('prevMode :>> ', prevMode);

      prevMode === 'all'
        ? prevSearchParams.set('comments', 'last')
        : prevSearchParams.set('comments', 'all');

      return prevSearchParams;
    });
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>
        Відгуки покупців<span>{` (${currentReviews.length})`}</span>
      </h3>
      {commentsParam === 'all'
        ? currentReviews &&
          currentReviews.length > 0 &&
          currentReviews.map((review, idx) => {
            return <NewReviewItem key={idx} review={review} mode="approved" />;
          })
        : currentReviews &&
          currentReviews.length > 0 && (
            <NewReviewItem review={currentReviews[0]} mode="approved" />
          )}
      <ReadMoreButton className={styles['read-more']} onClick={handleViewMode}>
        {commentsParam === 'all' ? 'Згорнути відгуки' : 'Дивитися всі відгуки'}
      </ReadMoreButton>
    </div>
  );
}
