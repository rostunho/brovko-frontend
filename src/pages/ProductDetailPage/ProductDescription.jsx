import { useParams } from 'react-router-dom';
import { Link, useLocation } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { getAllProducts } from 'redux/products/productsSelectors';

import GoBackButton from 'shared/components/GoBackButton/GoBackButton';

import styles from './ProductDetailPage.module.scss';

export default function ProductDescription({ description }) {
  const location = useLocation();
  const backLinkHref = location.state?.from ?? '/products';

  const { productId } = useParams();
  const allProducts = useSelector(getAllProducts);
  const product =
    allProducts && allProducts.products?.find(p => p._id === productId);

  if (!product) {
    return <p>Товар не знайдено</p>;
  }

  console.log('location.state', location.state);

  return (
    <div>
      <p>{product.description}</p>
      {/* Посилання на "Згорнути" */}
      <Link to={backLinkHref}>Back to products</Link>;
    </div>
  );
}
