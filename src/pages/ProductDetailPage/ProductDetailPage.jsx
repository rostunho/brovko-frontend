import { useParams, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getProductById } from 'shared/services/api';
import { getReviewsByProductId } from 'shared/services/api/brovko/reviews';
import Heading from 'shared/components/Heading';
import ProductDetail from 'components/ProductDetail/ProductDetail';

export default function ProductDetailPage() {
  const [product, setProduct] = useState(null);
  const [productError, setProductError] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewsError, setReviewsError] = useState(null);
  const { productId } = useParams();

  const location = useLocation();
  const locationGoBack = useLocation();
  const backLinkHref = locationGoBack.state?.from ?? '/';

  useEffect(() => {
    fetchProductById(productId);
    fetchReviewsByProductId(productId);
  }, [productId]);

  const fetchProductById = async id => {
    try {
      const product = await getProductById(id);
      setProduct(product);
    } catch (error) {
      console.error('Помилка при отриманні продукту:', error);
      setProductError(
        'Не вдалося завантажити продукт. Спробуйте знову пізніше.'
      );
    }
  };

  const fetchReviewsByProductId = async id => {
    try {
      const reviews = await getReviewsByProductId(id);
      setReviews(reviews);
    } catch (error) {
      console.error('Помилка при отриманні відгуків:', error);
      setReviewsError(
        'Не вдалося завантажити відгуки. Спробуйте знову пізніше.'
      );
    }
  };

  const approvedReviews = reviews.map(review => ({
    ...review,
    comments: review.comments.filter(comment => comment.text.status.approved),
  }));

  // ===============================================

  if (!product || productError) {
    return <p style={{ color: 'red', marginTop: '20px' }}>{productError}</p>;
  }

  return (
    <>
      <Heading withGoBack fromHC={backLinkHref}>
        {product.name}
      </Heading>

      <ProductDetail
        product={product}
        reviews={approvedReviews}
        reviewsError={reviewsError}
        location={location}
      />
    </>
  );
}
