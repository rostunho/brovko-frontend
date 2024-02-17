import { useState, useEffect, useRef } from 'react';
import { useParams, useLocation } from 'react-router-dom';
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
  const [priceHeight, setPriceHeight] = useState(null);
  const [logisticHeight, setLogisticHeght] = useState(null);
  const { isMobile } = useScreen();
  const [fromPage, setFromPage] = useState(null);

  const mainScreenRef = useRef();
  const dispatch = useDispatch();
  const priceRef = useRef();
  const logisticRef = useRef();

  const location = useLocation();
  console.log('location into New Product List Page :>> ', location);

  useEffect(() => {
    // після того, як прийшов продукт вимірюємо висоту контейнера, шоб дати таку саму сайдбару
    if (isMobile) {
      return;
    }

    const screenHeight = mainScreenRef.current.clientHeight;
    const priceHeight = priceRef.current.clientHeight;
    const logisticHeight = logisticRef.current.clientHeight;
    setMainScreenHeight(screenHeight);
    setPriceHeight(priceHeight);
    setLogisticHeght(logisticHeight);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  useEffect(() => {
    location.state !== null && setFromPage(location.state.from);
  }, [location.state]);

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
        <Heading withGoBack fromHC={fromPage} containerClassName={styles.title}>
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

          <NewDescription className={styles.desc} isMobile={isMobile}>
            {product.description}
          </NewDescription>

          {isMobile && <Comments />}
        </div>

        {!isMobile && (
          <aside
            className={styles.sidebar}
            style={{ height: mainScreenHeight }}
          >
            <OrderPrice ref={priceRef} product={product} />
            <LogisticInfo ref={logisticRef} />
            <Comments
              containerHeight={mainScreenHeight - priceHeight - logisticHeight}
              isMobile={isMobile}
            />
          </aside>
        )}
      </section>
    </>
  );
}
