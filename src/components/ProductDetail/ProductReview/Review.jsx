import { Outlet } from 'react-router-dom';
import SharedLinkButton from '../SharedLinkButton';
import ReviewContainer from './ReviewContainer';
import ReviewList from './ReviewList';

export default function Review({
  reviews,
  isExpandedReview,
  handleReadReviewClick,
}) {
  return (
    <>
      {reviews ? (
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
                state={{ isExpandedReview: true }}
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
