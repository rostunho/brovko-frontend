import { useState, useEffect, useRef } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useScreen } from 'shared/hooks/useScreen';
import { getProductById } from 'shared/services/api';
import { selectUserStatus } from 'redux/user/userSelectors';

import Heading from 'shared/components/Heading';
import AdminControlPanel from 'shared/components/AdminControlPanel/AdminControlPanel';
import Rating from 'components/ProductDetail/ProductRating/Rating';
import ImageBox from 'shared/components/ImageBox/ImageBox';
import OrderPrice from './OrderPrice/OrderPrice';
import ProductParams from 'components/ProductDetail/ProductParams/ProductParams';
import NewDescription from './NewDescription/NewDescription';
import Comments from 'components/Comments/Comments';
import LogisticInfo from 'components/ProductDetail/LogisticInfo/LogisticInfo';
import { removeProduct } from 'shared/services/api/brovko';
import { removeProductRequestTemplate } from 'components/Products/ProductsList';
import SEO from 'components/SEO/SEO';
import styles from './NewProductDetail.module.scss';

export default function NewProductDetailPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState(() => getCurrentProduct(productId));
  const [mainScreenHeight, setMainScreenHeight] = useState(null);
  const [priceHeight, setPriceHeight] = useState(null);
  const [logisticHeight, setLogisticHeght] = useState(null);
  const { isMobile } = useScreen();
  const [fromPage, setFromPage] = useState(null);
  const [commentsLength, setCommentsLength] = useState(0);

  const metaDescr = product.description;
  const strDescr = JSON.stringify(metaDescr);
  const cleanDescription = strDescr ? strDescr.replace(/<[^>]*>/g, '') : '';

  const updateCommentsLength = length => {
    setCommentsLength(length);
  };

  const mainScreenRef = useRef();
  const priceRef = useRef();
  const logisticRef = useRef();

  const location = useLocation();
  const navigate = useNavigate();
  const userStatus = useSelector(selectUserStatus);

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
      navigate('/not-found');
    }
  }

  const goToEditProduct = () => {
    navigate(`/admin/add-product/${productId}`);
  };

  const removeProducts = async id => {
    const body = removeProductRequestTemplate;

    body.product[0] = { id: productId };

    await removeProduct(body);
  };

  return (
    <>
      <section className={styles['page-screen']}>
        <Heading withGoBack fromHC={fromPage} containerClassName={styles.title}>
          {product?.name}
        </Heading>
        <SEO
          title={`${product.name} | Brovko - магазин снеків для собак`}
          description={cleanDescription}
          url={`/shop/product/${product.id}`}
        />
        {(userStatus === 'manager' || userStatus === 'superadmin') && (
          <AdminControlPanel
            simple
            onEditClick={goToEditProduct}
            onDeleteClick={removeProducts}
          />
        )}
        <div ref={mainScreenRef} className={styles['main-screen']}>
          <Rating className={styles.rating} commentsLength={commentsLength} />

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

          {isMobile && (
            <Comments
              isMobile={isMobile}
              onUpdateCommentsLength={updateCommentsLength}
            />
          )}
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
              onUpdateCommentsLength={updateCommentsLength}
            />
          </aside>
        )}
      </section>
    </>
  );
}
