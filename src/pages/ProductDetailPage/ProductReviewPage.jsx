import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAllProducts } from 'redux/products/productsSelectors';
import { getAllReviews } from 'redux/reviews/reviewsSelectors';
import { submitReview } from 'redux/reviews/reviewsOperations';

import useNavigationLogic from 'components/ProductDetail/useNavigationLogiс';
import ReviewContainer from 'components/ProductDetail/ProductReview/ReviewContainer';
import ReviewList from 'components/ProductDetail/ProductReview/ReviewList';
import ReadMoreBackButton from 'components/ProductDetail/ReadMoreBackButton';

export default function ReviewPage() {
  const initialState = 'isExpandedReview';
  const navigateTo = `../`;
  const backLinkHref = useNavigationLogic(initialState, navigateTo);
  const { productId } = useParams();
  const location = useLocation();
  const { product, reviews } = location.state;

  // const allProducts = useSelector(getAllProducts);
  // const allReviews = useSelector(getAllReviews);
  // const product = allProducts?.find(p => p._id === productId);
  // const reviews = allReviews?.find(r => r.productId === productId);

  if (!product) {
    return <p>Товар не знайдено</p>;
  }

  return (
    <div>
      <ReviewContainer />
      <ReviewList reviews={reviews} />

      <ReadMoreBackButton to={backLinkHref} label="Назад" />
    </div>
  );
}
