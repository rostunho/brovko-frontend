import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAllProducts } from 'redux/products/productsSelectors';
import { getAllReviews } from 'redux/reviews/reviewsSelectors';

import useNavigationLogic from '../useNavigationLogiс';
import fakeReviewsData from './fakeRewiewsData';
import ReviewList from './ReviewList';
import ReadMoreBackButton from '../ReadMoreBackButton';

export default function ReviewPage() {
  const initialState = 'isExpandedReview';
  const navigateTo = `../`;

  const backLinkHref = useNavigationLogic(initialState, navigateTo);

  const { productId } = useParams();
  const allProducts = useSelector(getAllProducts);
  const allReviews = useSelector(getAllReviews);

  const product = allProducts?.find(p => p._id === productId);
  const reviews = allReviews?.find(r => r.productId === productId);

  if (!product) {
    return <p>Товар не знайдено</p>;
  }

  return (
    <div>
      <ReviewList reviews={reviews} />

      <ReadMoreBackButton to={backLinkHref} label="Назад" />
    </div>
  );
}
