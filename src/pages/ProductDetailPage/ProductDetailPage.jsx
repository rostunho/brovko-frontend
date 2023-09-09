import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAllProducts } from 'redux/products/productsSelectors';

import Heading from 'shared/components/Heading';
import Image from 'shared/components/Image';
import StarEmpty from 'shared/icons/StarEmpty';

import styles from './ProductDetailPage.module.scss';

export default function ProductDetailPage() {
  const { productId } = useParams();

  const allProducts = useSelector(getAllProducts);

  const product =
    allProducts && allProducts.products.find(p => p._id === productId);

  if (!product) {
    return <p>Товар не знайдено</p>;
  }

  const { name } = product;

  return (
    <>
      <Heading withGoBack>{name}</Heading>
      <div className={styles.productCard}>
        <div className={styles.rating}>
          <StarEmpty />
          <StarEmpty />
          <StarEmpty />
          <StarEmpty />
          <StarEmpty />
          <p className={styles.ratingText}>100 відгуків</p>
        </div>

        <div className={styles.image}>
          <Image src={product.picture} />
        </div>
      </div>
    </>
  );
}
