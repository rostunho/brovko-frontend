import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
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
import Description from 'components/ProductDetail/ProductDescription/Description';
import Review from 'components/ProductDetail/ProductReview/Review';

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

  // useEffect(() => {
  //   getProductById(productId).then(product => setProduct(product));
  // }, [productId]);

  if (!product) {
    return;
  }
  const { _id, picture, name, note, price, currencyId } = product;

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
    <div className={styles.container}>
    
      <div className={styles.productCard}>
        {userStatus === 'manager' ||
          (userStatus === 'superadmin' && (
            <Button admin size="lg" onClick={goToEditProduct}>
              РЕДАГУВАТИ
            </Button>
          ))}
<div>
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
          size="lg"
          style={{ marginTop: 33 }}
        >
          {orderInBasket ? 'Видалити з кошика' : 'Додати в кошик'}
        </Button>
        {isOpen && <ModalProductsInBasket closeModal={closeModal} />}
</div>
       

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
          reviewsError={reviewsError}
          product={product}
        />
      </div>
    </div>
  );
}
