import { Outlet } from 'react-router-dom';
import fakeReviewsData from './fakeRewiewsData';
import SharedLinkButton from '../SharedLinkButton';
import ReviewContainer from './ReviewContainer';
import ReviewList from './ReviewList';

export default function Review({
  isExpandedReview,
  location,
  handleReadReviewClick,
}) {
  return (
    <>
      {fakeReviewsData ? (
        isExpandedReview ? (
          <>
            <Outlet />
          </>
        ) : (
          <>
            <ReviewContainer />
            <ReviewList reviews={fakeReviewsData.slice(0, 1)} />

            {!isExpandedReview && (
              <SharedLinkButton
                to={`review`}
                state={{ from: '/product-list-page', isExpandedReview: true }}
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
