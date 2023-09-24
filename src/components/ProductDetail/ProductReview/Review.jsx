import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAllReviews } from 'redux/reviews/reviewsSelectors';
import fakeReviewsData from './fakeRewiewsData';
import SharedLinkButton from '../SharedLinkButton';
import ReviewContainer from './ReviewContainer';
import ReviewList from './ReviewList';

export default function Review({
  isExpandedReview,
  location,
  handleReadReviewClick,
}) {
  const reviews = useSelector(getAllReviews);
  console.log('reviews:', reviews);
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
            <ReviewList reviews={reviews.slice(0, 1)} />

            {!isExpandedReview && (
              <SharedLinkButton
                to={`review`}
                state={{ isExpandedReview: true }}
                // state={{
                //   from: location.state.from,
                //   isExpandedReview: true,
                // }}
                label="Дивитися всі відгуки"
                onClick={handleReadReviewClick}
              />
            )}
          </>
        )
      ) : (
        <p>Завантаження...</p>
      )}
    </>
  );
}
