import { useParams } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { getAllProducts } from 'redux/products/productsSelectors';

import GoBackButton from 'shared/components/GoBackButton/GoBackButton';

import styles from './ProductDetailPage.module.scss';

export default function ProductDescription({ description }) {
  const { productId } = useParams();
  const allProducts = useSelector(getAllProducts);
  const product =
    allProducts && allProducts.products?.find(p => p._id === productId);

  if (!product) {
    return <p>Товар не знайдено</p>;
  }

  return (
    <div>
      <p>{product.description}</p>
      {/* Посилання на "Згорнути" */}

      <GoBackButton>Згорнути</GoBackButton>
    </div>
  );
}
