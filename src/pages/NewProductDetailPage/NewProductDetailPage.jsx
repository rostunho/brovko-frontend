import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getProductById } from 'shared/services/api';
import { addPopupOperation } from 'redux/popup/popupOperations';

import Heading from 'shared/components/Heading';
import Rating from 'components/ProductDetail/ProductRating/Rating';
import ImageBox from 'shared/components/ImageBox/ImageBox';
import OrderPrice from './OrderPrice/OrderPrice';
import ProductParams from 'components/ProductDetail/ProductParams/ProductParams';
import NewDescription from './NewDescription/NewDescription';
import Comments from 'components/Comments/Comments';
import styles from './NewProductDetail.module.scss';

export default function NewProductDetailPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState(() => getCurrentProduct(productId));
  const dispatch = useDispatch();

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
      <Heading withGoBack>{product?.name}</Heading>

      <Rating className={styles.rating} />

      <ImageBox className={styles['image-box']} images={product?.picture} />

      <OrderPrice product={product} />

      {product?.params?.length > 0 && <ProductParams params={product.params} />}

      <NewDescription className={styles.desc}>
        {product.description}
      </NewDescription>

      <Comments />
    </>
  );
}
