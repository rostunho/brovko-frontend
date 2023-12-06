import { useParams, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { getAllProducts } from 'redux/products/productsSelectors';
import { getAllReviews } from 'redux/reviews/reviewsSelectors';
import Heading from 'shared/components/Heading';
import ProductDetail from 'components/ProductDetail/ProductDetail';

export default function ProductDetailPage() {
  const { productId } = useParams();
  const location = useLocation();
  const from = location.state?.from || '/';

  const allProducts = useSelector(getAllProducts);
  const allReviews = useSelector(getAllReviews);

  // console.log('allProducts', allProducts);
  console.log('allReviews', allReviews);

  const product = allProducts?.find(p => p._id === productId);
  const reviews = allReviews?.find(r => r.productId === productId);

  // ================================================

  const [isExpandedDescription, setIsExpandedDescription] = useState(false);
  const [isExpandedReview, setIsExpandedReview] = useState(false);

  useEffect(() => {
    // Встановлюємо isExpandedDescription з location.state
    const isExpandedDescriptionFromLocation =
      location.state?.isExpandedDescription || false;
    setIsExpandedDescription(isExpandedDescriptionFromLocation);

    // Встановлюємо isExpandedReview з location.state
    const isExpandedReviewFromLocation =
      location.state?.isExpandedReview || false;
    setIsExpandedReview(isExpandedReviewFromLocation);
  }, [location.state]);

  const handleReadMoreClick = () => {
    setIsExpandedDescription(true);
  };

  const handleReadReviewClick = () => {
    setIsExpandedReview(true);
  };
  // ===============================================

  if (!product) {
    return <p>Товар не знайдено</p>;
  }

  return (
    <>
      <Heading withGoBack fromHC={'/shop/product-list-page'}>
        {product.name}
      </Heading>
      <ProductDetail
        product={product}
        reviews={reviews}
        isExpandedDescription={isExpandedDescription}
        isExpandedReview={isExpandedReview}
        handleReadMoreClick={handleReadMoreClick}
        handleReadReviewClick={handleReadReviewClick}
      />
    </>
  );
}
