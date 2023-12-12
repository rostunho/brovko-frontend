import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addOrder } from 'redux/basket/basketSlice';
import { getAllOrders } from 'redux/basket/basketSelectors';
// import { addToCart } from 'redux/cart/cartActions';

import Image from 'shared/components/Image';
import Button from 'shared/components/Button';
import Rating from 'components/ProductDetail/Rating';
import ImageSlider from 'components/ProductDetail/ImageSlider';
import Content from 'components/ProductDetail/Content';
import QuantityButtons from 'shared/components/QuantityButtonModal/QuantityButtons';
import Price from 'components/ProductDetail/Price';
import Description from 'components/ProductDetail/ProductDescription/Description';
import Review from 'components/ProductDetail/ProductReview/Review';

import { getAllProducts } from 'redux/products/productsSelectors';
import { getAllReviews } from 'redux/reviews/reviewsSelectors';
import { addPopupOperation } from 'redux/popup/popupOperations';
import { getProductById } from 'shared/services/api';

import styles from './ProductDetail.module.scss';

export default function ProductDetail({
  // product,
  // reviews,
  isExpandedDescription,
  isExpandedReview,
  handleReadMoreClick,
  handleReadReviewClick,
  location,
}) {
  // const [product, setProduct] = useState(null);
  const [value, setValue] = useState(1);
  const dispatch = useDispatch();

  const { productId } = useParams();
  console.log('useParams', productId);

  const allProducts = useSelector(getAllProducts);
  const allReviews = useSelector(getAllReviews);

  const product = allProducts?.find(p => p._id === productId);
  const reviews = allReviews?.find(r => r.productId === productId);

  const orders = useSelector(getAllOrders);

  // useEffect(() => {
  //   getProductById(productId).then(product => setProduct(product));
  // }, [productId]);

  if (!product) {
    return;
  }
  const { _id, picture, name, note, price, currencyId } = product;

  const handleAddPopup = text => {
    dispatch(addPopupOperation(text));
  };

  const handleAddToCart = () => {
    const result = orders.some(order => order._id === product._id);
    if (result) {
      handleAddPopup('Товар вже знаходиться в кошику');
      return;
    }
    dispatch(addOrder({ ...product, value: value }));
    dispatch(addPopupOperation('Товар додано в кошик'));
  };

  return (
    <>
      <div className={styles.productCard}>
        <Rating product={product} />
        <div className={styles.image}>
          <Image src={picture} />
        </div>
        <ImageSlider picture={picture} />
        <Content note={note} />
        <div className={styles.price}>
          <h3>
            {price} {currencyId}
          </h3>
          <QuantityButtons value={value} setValue={setValue} />
        </div>
        <Button
          onClick={handleAddToCart}
          value={value}
          type="submit"
          style={{ paddingLeft: 86, paddingRight: 86, marginTop: 33 }}
        >
          Додати в кошик
        </Button>
        <Description
          product={product}
          isExpandedDescription={isExpandedDescription}
          location={location}
          handleReadMoreClick={handleReadMoreClick}
        />
        <Review
          isExpandedReview={isExpandedReview}
          location={location}
          handleReadReviewClic={handleReadReviewClick}
          reviews={reviews}
        />{' '}
      </div>
    </>
  );
}
