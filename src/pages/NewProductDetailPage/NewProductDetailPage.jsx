import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useScreen } from 'shared/hooks/useScreen';
import { getProductById } from 'shared/services/api';
import { addPopupOperation } from 'redux/popup/popupOperations';

import Heading from 'shared/components/Heading';
import Rating from 'components/ProductDetail/ProductRating/Rating';
import ImageBox from 'shared/components/ImageBox/ImageBox';
import OrderPrice from './OrderPrice/OrderPrice';
import ProductParams from 'components/ProductDetail/ProductParams/ProductParams';
import NewDescription from './NewDescription/NewDescription';
import Comments from 'components/Comments/Comments';
import LogisticInfo from 'components/ProductDetail/LogisticInfo/LogisticInfo';
import styles from './NewProductDetail.module.scss';

export default function NewProductDetailPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState(() => getCurrentProduct(productId));
  const [mainScreenHeight, setMainScreenHeight] = useState(null);
  const dispatch = useDispatch();
  const { isMobile } = useScreen();
  const mainScreenRef = useRef();

  useEffect(() => {
    // після того, як прийшов продукт вимірюємо висоту контейнера, шоб дати таку саму сайдбару
    const targetHeight = mainScreenRef.current.clientHeight;
    setMainScreenHeight(targetHeight);
  }, [product]);

  async function getCurrentProduct(id) {
    try {
      const currentProduct = await getProductById(id);
      setProduct(currentProduct);
    } catch (error) {
      console.error(error);
      dispatch(addPopupOperation('Не вдалося завантажити продукт', 'error'));
    }
  }

  return (
    <>
      <section className={styles['page-screen']}>
        <Heading withGoBack containerClassName={styles.title}>
          {product?.name}
        </Heading>
        <div ref={mainScreenRef} className={styles['main-screen']}>
          <Rating className={styles.rating} />

          <ImageBox
            className={styles['image-box']}
            images={product?.picture}
            isMobile={isMobile}
          />

          {isMobile && <OrderPrice product={product} />}

          {product?.params?.length > 0 && (
            <ProductParams params={product.params} />
          )}

          <NewDescription className={styles.desc}>
            {product.description}
          </NewDescription>

          {isMobile && <Comments />}
        </div>

        {!isMobile && (
          <aside
            className={styles.sidebar}
            style={{ height: mainScreenHeight }}
          >
            {!isMobile && <OrderPrice product={product} />}
            <LogisticInfo />
            <Comments />
          </aside>
        )}
      </section>
    </>
  );
}
