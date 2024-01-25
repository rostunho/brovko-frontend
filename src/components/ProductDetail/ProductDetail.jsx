import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import useLayoutType from 'shared/hooks/useLayoutType';

import { addOrder } from 'redux/basket/basketSlice';
import { getAllOrders } from 'redux/basket/basketSelectors';
import { selectUserStatus } from 'redux/user/userSelectors';
import { addPopupOperation } from 'redux/popup/popupOperations';
// import { addToCart } from 'redux/cart/cartActions';
import ModalProductsInBasket from 'components/ModalProductsInBasket/ModalProductsInBasket';
import useModal from 'shared/hooks/useModal';

import Image from 'shared/components/Image';
import Button from 'shared/components/Button';
import Rating from 'components/ProductDetail/Rating';
import ImageSlider from 'components/ProductDetail/ImageSlider';
import Content from 'components/ProductDetail/Content';
import QuantityButtons from 'shared/components/QuantityButtonModal/QuantityButtons';
import Price from 'components/ProductDetail/Price';
import { DeliveryAndPaymentBlock } from './DeliveryAndPaymentBlock';
import Description from 'components/ProductDetail/ProductDescription/Description';
import Review from 'components/ProductDetail/ProductReview/Review';
import { PRODUCT_NOTE, DELIVERY_INFO, PAYMENT_INFO } from './productsFackeData.js'

import styles from './ProductDetail.module.scss';

export default function ProductDetail({
  product,
  reviews,
  reviewsError,
  isExpandedDescription,
  isExpandedReview,
  handleReadMoreClick,
  handleReadReviewClick,
  location,
}) {
  // const [product, setProduct] = useState(null);
  console.log('product into PD :>> ', product);
  // console.log('reviews into PD :>> ', reviews);
  const [value, setValue] = useState(1);
  const userStatus = useSelector(selectUserStatus);
  const { productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orders = useSelector(getAllOrders);
  const { isOpen, openModal, closeModal } = useModal();
  
  const layoutType = useLayoutType();

  const isMobile = layoutType ==='mobile';
  const isTablet = layoutType === 'tablet';
  const isDesktop = layoutType === 'desktop';

  // useEffect(() => {
  //   getProductById(productId).then(product => setProduct(product));
  // }, [productId]);

  if (!product) {
    return;
  }
  const { _id, picture, name, price, currencyId } = product;

  const note = PRODUCT_NOTE;
  const delivery = DELIVERY_INFO;
  const payment = PAYMENT_INFO;

  // const handleAddPopup = text => {
  //   dispatch(addPopupOperation(text));
  // };

  const goToEditProduct = () => {
    navigate(`/admin/${productId}`);
  };

  const orderInBasket = orders.some(order => order._id === product._id);

  const handleAddToCart = () => {
    if (orderInBasket) {
      openModal();
      return;
    }
    dispatch(addOrder({ ...product, value: value }));
    dispatch(addPopupOperation('Товар додано в кошик'));
  };

  return (
   
      <div className={styles.productCard}>
        {userStatus === 'manager' ||
          (userStatus === 'superadmin' && (
            <Button admin size="lg" onClick={goToEditProduct}>
              РЕДАГУВАТИ
            </Button>
          ))}
          <Rating product={product} />
        <div className={styles.productHalfCard}>
        <div className={styles.productQuarterCard}>
       
          <div className={styles.image}>
            <Image src={picture} />
          </div>
          <ImageSlider picture={picture} />
        </div>
          
<div className={styles.productQuarterCard}>
          <Content note={note} />
          <div className={styles.price}>
            <h3 className={styles.priceHeading}>
            {isTablet ? 'Ціна: ' : null}
              {price} {currencyId}
            </h3>
            <h3 className={styles.priceQuantity}>
            {isTablet  ? 'Кількість:' : null}
            <QuantityButtons  value={value} setValue={setValue} />
            </h3>
           
           
          </div>
          <Button
            onClick={handleAddToCart}
            value={value}
            type="submit"
            size="lg"
            style={{ marginTop: 33 }}
          >
            {orderInBasket ? 'Видалити з кошика' : 'Додати в кошик'}
          </Button>

          {isOpen && <ModalProductsInBasket closeModal={closeModal} />}

          {isTablet  && <DeliveryAndPaymentBlock delivery={delivery} payment={payment}/>}
        </div>
        
</div>
          <div className={styles.productHalfCard}>
          <div className={styles.productQuarterCard}>
          <Description
          product={product}
          isExpandedDescription={isExpandedDescription}
          location={location}
          handleReadMoreClick={handleReadMoreClick}
        />
          </div>
          
          <div className={styles.productQuarterCard}>
        <Review
          isExpandedReview={isExpandedReview}
          location={location}
          handleReadReviewClic={handleReadReviewClick}
          reviews={reviews}
          reviewsError={reviewsError}
          product={product}
        />
        </div>
          </div>

        
      </div>
   
  );
}
