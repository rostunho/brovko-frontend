import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getProductById } from 'shared/services/api';
import { addPopupOperation } from 'redux/popup/popupOperations';

import Heading from 'shared/components/Heading';

export default function NewProductDetailPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!productId) {
      return;
    }

    getCurrentProduct(productId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  const getCurrentProduct = async id => {
    try {
      const currentProduct = await getProductById(id);
      setProduct(currentProduct);
    } catch (error) {
      console.error(error);
      dispatch(addPopupOperation('Не вдалося завантажити продукт', error));
    }
  };

  return (
    <>
      <Heading withGoBack>{product.name}</Heading>
    </>
  );
}
