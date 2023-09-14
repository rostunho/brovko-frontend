import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAllProducts } from 'redux/products/productsSelectors';
import { useEffect } from 'react';

import DropdownArrowIcon from 'shared/icons/DropdownArrowIcon';

import styles from './ProductDetail.module.scss';

export default function ProductDescription() {
  const navigate = useNavigate();
  const location = useLocation();
  const isExpandedDescriptionFromLocation =
    location.state?.isExpandedDescription || false;
  const backLinkHref = location.state?.from ?? '/products';

  const { productId } = useParams();
  const allProducts = useSelector(getAllProducts);
  const product = allProducts?.find(p => p._id === productId);

  // оновлення стану при завантаженні компонента
  useEffect(() => {
    if (!isExpandedDescriptionFromLocation) {
      // Перейти назад на сторінку ProductDetailPage
      navigate(`../`, { state: { isExpandedDescription: false } });
    }
  }, [navigate, isExpandedDescriptionFromLocation]);

  if (!product) {
    return <p>Товар не знайдено</p>;
  }

  return (
    <div>
      <p className={styles.descriptionText}>{product.description}</p>
      <Link to={backLinkHref} className={styles.readMoreLink}>
        <p className={styles.readMoreButton}>Назад</p>
        <DropdownArrowIcon
          className={`${styles.readMoreIcon} ${styles['readMoreIcon-reverse']} `}
        />
      </Link>
    </div>
  );
}
