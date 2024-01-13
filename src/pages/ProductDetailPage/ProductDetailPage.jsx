import { useParams, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getProductById } from 'shared/services/api';
import { getReviewsByProductId } from 'shared/services/api/brovko/reviews';
import Heading from 'shared/components/Heading';
import ProductDetail from 'components/ProductDetail/ProductDetail';

export default function ProductDetailPage() {
  
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [isExpandedDescription, setIsExpandedDescription] = useState(false);
  const [isExpandedReview, setIsExpandedReview] = useState(false);
  const { productId } = useParams();
  const location = useLocation();

  // console.log('reviews into PDP :>>>>> ', reviews);

  useEffect(() => {
    fetchProductById(productId);
    fetchReviewsByProductId(productId);
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

  const fetchReviewsByProductId = async (id) => {
    const reviews = await getReviewsByProductId(id);
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
