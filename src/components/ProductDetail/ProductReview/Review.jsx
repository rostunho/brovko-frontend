import { useState } from 'react';
import useLayoutType from 'shared/hooks/useLayoutType';
import SharedLinkButton from '../ProductDetailButtons/SharedLinkButton';
import ReadMoreBackButton from '../ProductDetailButtons/ReadMoreBackButton';
import ReviewContainer from './ReviewContainer';
import ReviewList from './ReviewList';

export default function Review({
  product,
  reviews,
  reviewsError,
  isExpandedReview,
}) {
  const layoutType = useLayoutType();
  const isMobile = layoutType === 'mobile';

  const [expandedReviews, setExpandedReviews] = useState(isExpandedReview);

  return (
    <>
      {reviewsError ? (
        <p style={{ color: 'red' }}>{reviewsError}</p>
      ) : (
    reviews.length > 0 ? (
        <>
          <ReviewContainer />
          {expandedReviews ? (
            <ReviewList reviews={reviews} isExpandedReview={true} />
          ) : (
            <ReviewList reviews={reviews} isExpandedReview={false} />
          )}
          <ReadMoreBackButton
            label={expandedReviews ? "Приховати відгуки" : "Дивитися всі відгуки"}
            onClick={() => setExpandedReviews(!expandedReviews)}
          />
        </>
    ) : (
          <>
          <ReviewContainer />
          <p>Для цього смаколика ще не написано жодного відгука....</p>
           </>
        )
      )}
    </>
  );
}


