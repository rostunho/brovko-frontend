import { Outlet } from 'react-router-dom';
import fakeReviewsData from './fakeRewiewsData';
import SharedLinkButton from '../SharedLinkButton';
import ReviewContainer from './ReviewContainer';
import ReviewList from './ReviewList';

export default function Review({
  reviews,
  isExpandedReview,
  location,
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
        <p>Для цього смаколика ще не написано жодного відгука....</p>
      )}
    </>
  );
}
