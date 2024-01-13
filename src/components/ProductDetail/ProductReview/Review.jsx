import { Outlet } from 'react-router-dom';
import SharedLinkButton from '../SharedLinkButton';
import ReviewContainer from './ReviewContainer';
import ReviewList from './ReviewList';

export default function Review({
  product,
  reviews,
  isExpandedReview,
  handleReadReviewClick,
}) {

  return (
    <>
      {reviews.length > 0 ? (
        isExpandedReview ? (
          <>
            <Outlet />
          </>
        ) : (
          <>
            <ReviewContainer />
            <ReviewList reviews={reviews} isExpandedReview={isExpandedReview} />

            {!isExpandedReview && (
              <SharedLinkButton
                to={`review`}
                // to={{
                //   pathname: `review`,
                //   state: { product: product, reviews: reviews },
                // }}
                state={{ isExpandedReview: true, product, reviews }}
                label="Дивитися всі відгуки"
                onClick={handleReadReviewClick}
              />
            )}
          </>
        )
      ) : (
        <>
          <ReviewContainer />
          <p>Для цього смаколика ще не написано жодного відгука....</p>
        </>
      )}
    </>
  );
}
