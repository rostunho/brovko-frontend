import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import useLayoutType from 'shared/hooks/useLayoutType';
import { selectUserStatus } from 'redux/user/userSelectors';
import ModalProductsInBasket from 'components/ModalProductsInBasket/ModalProductsInBasket';
import useModal from 'shared/hooks/useModal';

import Image from 'shared/components/Image';
import Button from 'shared/components/Button';
import Rating from 'components/ProductDetail/ProductRating/Rating';
import ImageSlider from 'components/ProductDetail/ProductImgSlider/ImageSlider';
import ProductParams from './ProductParams/ProductParams';
import QuantityButtons from 'shared/components/QuantityButtonModal/QuantityButtons';

import { DeliveryAndPaymentBlock } from './DeliveryAndPaymentBlock/DeliveryAndPaymentBlock';
import Description from 'components/ProductDetail/ProductDescription/Description';
import Review from 'components/ProductDetail/ProductReview/Review';
import {
  // PRODUCT_NOTE,
  DELIVERY_INFO,
  PAYMENT_INFO,
} from './ProductData/productsFackeData.js';

import useProductInBasket from 'shared/hooks/useProductInBasket';

import styles from './ProductDetail.module.scss';

export default function ProductDetail({ product, reviews, reviewsError }) {
  const { handleAddToCart, showBascketOrders } = useProductInBasket();
  const products = showBascketOrders();

  const [value, setValue] = useState(1);
  const userStatus = useSelector(selectUserStatus);
  const { productId } = useParams();
  const navigate = useNavigate();
  const { isOpen, closeModal } = useModal();

  const layoutType = useLayoutType();

  const isMobile = layoutType === 'mobile';
  const isDesktop = layoutType === 'desktop';

  if (!product) {
    return;
  }
  const { picture, price, currencyId } = product;

  const delivery = DELIVERY_INFO;
  const payment = PAYMENT_INFO;

  const goToEditProduct = () => {
    navigate(`/admin/${productId}`);
  };
  const orderInBasket = products.some(order => console.log('order', order));

  const EditButton = ({ userStatus, goToEditProduct }) => {
    if (userStatus === 'manager' || userStatus === 'superadmin') {
      return (
        <Button admin size="lg" onClick={goToEditProduct}>
          РЕДАГУВАТИ
        </Button>
      );
    }
    return null;
  };

  return (
    <section className={styles.productCard}>
      <EditButton userStatus={userStatus} goToEditProduct={goToEditProduct} />
      <Rating product={product} />
      <div className={styles.productHalfCard}>
        <div className={styles.productQuarterCard}>
          <Image className={styles.image} src={picture} />
          <ImageSlider picture={picture} />
          {isDesktop && <Description product={product} />}
        </div>

        <div className={styles.productQuarterCard}>
          {product?.params.length > 0 && (
            <ProductParams params={product?.params} />
          )}

          <div className={styles.price}>
            <h3 className={styles.priceHeading}>
              {!isMobile ? (
                <span style={{ marginRight: '8px' }}>Ціна: </span>
              ) : null}
              {price} {currencyId}
            </h3>
            <h3 className={styles.priceQuantity}>
              {!isMobile ? <span>Кількість:</span> : null}
              <QuantityButtons value={value} setValue={setValue} />
            </h3>
          </div>
          <Button
            onClick={e => {
              e.preventDefault();
              handleAddToCart({ product, value });
            }}
            value={value}
            type="submit"
            size="lg"
            style={{ marginTop: 32 }}
          >
            {!orderInBasket ? 'Видалити з кошика' : 'Додати в кошик'}
          </Button>

          {isOpen && <ModalProductsInBasket closeModal={closeModal} />}
          {!isMobile && (
            <DeliveryAndPaymentBlock delivery={delivery} payment={payment} />
          )}
          {isDesktop && (
            <Review
              reviews={reviews}
              reviewsError={reviewsError}
              product={product}
            />
          )}
        </div>
      </div>

      <div className={styles.productHalfCard}>
        {!isDesktop && (
          <div className={styles.productQuarterCard}>
            <Description product={product} />
          </div>
        )}

        {!isDesktop && (
          <div className={styles.productQuarterCard}>
            <Review
              reviews={reviews}
              reviewsError={reviewsError}
              product={product}
            />
          </div>
        )}
      </div>
    </section>
  );
}
