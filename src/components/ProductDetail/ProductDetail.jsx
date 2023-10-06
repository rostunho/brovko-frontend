import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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

import styles from './ProductDetail.module.scss';

export default function ProductDetail({
  product,
  reviews,
  isExpandedDescription,
  isExpandedReview,
  handleReadMoreClick,
  handleReadReviewClick,
  location,
}) {
  const orders = useSelector(getAllOrders);

  const { _id, picture, name, note, price, currencyId } = product;

  const [value, setValue] = useState(1);

  const dispatch = useDispatch();

  const handleAddToCart = () => {
    const result = orders.some(order => order._id === product._id);
    if (result) {
      return;
    }
    dispatch(addOrder({ ...product, value: value }));
    alert('Product in basket');
    // setValue(1);
  };

  return (
    <>
      <div className={styles.productCard}>
        <Rating product={product} />
        <Image className={styles.image} src={picture} />
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
          // setValue={setValue}
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
