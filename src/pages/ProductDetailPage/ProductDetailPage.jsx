import { useParams, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { getAllProducts } from 'redux/products/productsSelectors';
import { getProductById } from 'shared/services/api';
import { getAllReviews } from 'redux/reviews/reviewsSelectors';

import { getReviews } from 'shared/services/api';
import Heading from 'shared/components/Heading';
import ProductDetail from 'components/ProductDetail/ProductDetail';

export default function ProductDetailPage() {
  // const from = location.state?.from || '/';

  // const allProducts = useSelector(getAllProducts);
  // const allReviews = useSelector(getAllReviews);

  // console.log('allProducts', allProducts);
  // console.log('allReviews', allReviews);

  // const product = allProducts?.find(p => p._id === productId);
  // const reviews = allReviews?.find(r => r.productId === productId);

  // ================================================
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [isExpandedDescription, setIsExpandedDescription] = useState(false);
  const [isExpandedReview, setIsExpandedReview] = useState(false);
  const { productId } = useParams();
  const location = useLocation();

  // console.log('reviews into PDP :>> ', reviews);

  useEffect(() => {
    fetchAllReviews();
    fetchProductById(productId);
  }, [productId]);

  useEffect(() => {
    // Встановлюємо isExpandedDescription з location.state
    const isExpandedDescriptionFromLocation =
      location.state?.isExpandedDescription || false;
    setIsExpandedDescription(isExpandedDescriptionFromLocation);

    // Встановлюємо isExpandedReview з location.state
    const isExpandedReviewFromLocation =
      location.state?.isExpandedReview || false;
    setIsExpandedReview(isExpandedReviewFromLocation);
  }, [location?.state]);

  const fetchProductById = async id => {
    const product = await getProductById(id);
    setProduct(product);
  };

  const fetchAllReviews = async () => {
    const reviews = await getReviews();
    setReviews(reviews);
  };

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
        location={location}
      />
    </>
  );
}
