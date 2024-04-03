// import { useState, useEffect } from 'react';
// import { useParams, useLocation } from 'react-router-dom';

// import useNavigationLogic from 'shared/hooks/useNavigationLogiс';
// import ReviewContainer from 'components/ProductDetail/ProductReview/ReviewContainer';
// import ReviewList from 'components/ProductDetail/ProductReview/ReviewList';
// import ReadMoreBackButton from 'components/ProductDetail/ProductDetailButtons/ReadMoreBackButton';

// export default function ProductReviewPage() {
//   const initialState = 'isExpandedReview';
//   const navigateTo = `../`;
//   const backLinkHref = useNavigationLogic(initialState, navigateTo);
//   // const { productId } = useParams();
//   const location = useLocation();
//   const { product, reviews } = location.state;


//   const approvedReviews = reviews.map(review => ({
//     ...review,
//     comments: review.comments.filter(comment => comment.text.status.approved),
//   }));
//   console.log('approvedReviews', approvedReviews);



//   if (!product) {
//     return <p>Товар не знайдено</p>;
//   }

//   return (
//     <div>
//       <ReviewContainer />
//       <ReviewList reviews={approvedReviews} />

//       <ReadMoreBackButton to={backLinkHref} label="Назад" />
//     </div>
//   );
// }
