import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { fetchReviews } from 'redux/reviews/reviewsOperations';
import { getAllProducts } from 'redux/products/productsSelectors';
import { getAllReviews } from 'redux/reviews/reviewsSelectors';

import useNavigationLogic from '../useNavigationLogiс';
// import fakeReviewsData from './fakeRewiewsData';
import ReviewList from './ReviewList';
import ReadMoreBackButton from '../ReadMoreBackButton';

export default function ReviewPage({ reviews }) {
  // const dispatch = useDispatch();
  // const reviews = useSelector(getAllReviews);

  // console.log('reviews:', reviews);

  const initialState = 'isExpandedReview';
  const navigateTo = `../`;

  const backLinkHref = useNavigationLogic(initialState, navigateTo);

  const { productId } = useParams();
  const allProducts = useSelector(getAllProducts);
  const product = allProducts?.find(p => p._id === productId);

  // useEffect(() => {
  //   dispatch(fetchReviews());
  // }, [dispatch]);

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
