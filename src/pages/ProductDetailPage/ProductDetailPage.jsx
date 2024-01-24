import { useParams, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getProductById } from 'shared/services/api';
import { getReviewsByProductId } from 'shared/services/api/brovko/reviews';
import { addPopupOperation } from 'redux/popup/popupOperations';
import Heading from 'shared/components/Heading';
import ProductDetail from 'components/ProductDetail/ProductDetail';

export default function ProductDetailPage() {
  
  const [product, setProduct] = useState(null);
  const [productError, setProductError] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewsError, setReviewsError] = useState(null);
  const [isExpandedDescription, setIsExpandedDescription] = useState(false);
  const [isExpandedReview, setIsExpandedReview] = useState(false);
  const { productId } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();

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
    try {
      const product = await getProductById(id);
    setProduct(product);
      
    } catch (error) {
      console.error('Помилка при отриманні продукту:', error);
        setProductError('Не вдалося завантажити продукт. Спробуйте знову пізніше.');
        // dispatch(addPopupOperation('Не вдалося завантажити продукт. Спробуйте знову пізніше.', 'error'))
        
    }
    
  };

  const fetchReviewsByProductId = async (id) => {
    try {
      const reviews = await getReviewsByProductId(id);
      setReviews(reviews);
      
    } catch (error) {
      console.error('Помилка при отриманні відгуків:', error);
        setReviewsError('Не вдалося завантажити відгуки. Спробуйте знову пізніше.');
        // dispatch(addPopupOperation('Не вдалося завантажити відгуки. Спробуйте знову пізніше.', 'error'))
    }
   
  };
 

  const handleReadMoreClick = () => {
    setIsExpandedDescription(true);
  };

  const handleReadReviewClick = () => {
    setIsExpandedReview(true);
  };
  // ===============================================

  if (!product || productError) {
    return     (<p style={{ color: 'red', marginTop: '20px'}}>{productError}</p>);
  } 

  return (
    <>
      <Heading withGoBack fromHC={'/shop/product-list-page'}>
        {product.name}
      </Heading>
    
      <ProductDetail
        product={product}
        reviews={reviews}
        reviewsError={reviewsError}
        isExpandedDescription={isExpandedDescription}
        isExpandedReview={isExpandedReview}
        handleReadMoreClick={handleReadMoreClick}
        handleReadReviewClick={handleReadReviewClick}
        location={location}
      />
    </>
  );
}
