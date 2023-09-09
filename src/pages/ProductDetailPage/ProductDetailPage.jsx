import { useParams, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllProducts } from 'redux/products/productsSelectors';

import Heading from 'shared/components/Heading';
import Image from 'shared/components/Image';
import StarEmpty from 'shared/icons/StarEmpty';
import ProductDescription from './ProductDescription';

import styles from './ProductDetailPage.module.scss';
import Button from 'shared/components/Button';

export default function ProductDetailPage() {
  const location = useLocation();
  const from = location.state?.from || '/';

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

        <Image className={styles.image} src={product.picture} />

        <div className={styles.imageSliderContainer}>
          <Image className={styles.imageSlider} src={product.picture} />
          <Image className={styles.imageSlider} src={product.picture} />
        </div>
        <div className={styles.contentContainer}>
          <p className={styles.contentText}>
            <span className={styles.contentHeader}>СКЛАД:</span>
            {product.description}
          </p>
        </div>
        <div className={styles.price}>
          <h3>
            {product.price} {product.currencyId}
          </h3>
          <div className={styles.amount}>
            <Button mode={'adding'} style={{ minWidth: '24px' }}></Button>
            <h3>1</h3>
            <Button mode={'adding'} style={{ minWidth: '24px' }}></Button>
          </div>
        </div>

        <Button
          type="submit"
          style={{ paddingLeft: 86, paddingRight: 86, marginTop: 33 }}
        >
          Додати в кошик
        </Button>

        <div className={styles.descriptionContainer}>
          <h3 style={{ marginBottom: 8 }}>Опис</h3>
          {product.description}
          <Link
            to={`/product/${productId}/description`}
            state={{ from: location.state?.from } ?? '/'}
            className={styles.readMoreLink}
          >
            <p> Читати повністю </p>
          </Link>
        </div>
        <Outlet />
      </div>
    </>
  );
}
