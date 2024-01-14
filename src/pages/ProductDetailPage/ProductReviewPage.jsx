import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';

import useNavigationLogic from 'components/ProductDetail/useNavigationLogiс';
import ReviewContainer from 'components/ProductDetail/ProductReview/ReviewContainer';
import ReviewList from 'components/ProductDetail/ProductReview/ReviewList';
import ReadMoreBackButton from 'components/ProductDetail/ReadMoreBackButton';

export default function ProductReviewPage() {
  const initialState = 'isExpandedReview';
  const navigateTo = `../`;
  const backLinkHref = useNavigationLogic(initialState, navigateTo);
  // const { productId } = useParams();
  const location = useLocation();
  const { product, reviews } = location.state;


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
