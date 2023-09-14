import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAllProducts } from 'redux/products/productsSelectors';
import { useEffect } from 'react';
import fakeReviewsData from './fakeRewiewsData';
import ReviewItem from './ReviewItem';

import DropdownArrowIcon from 'shared/icons/DropdownArrowIcon';

import styles from './ProductDetail.module.scss';

export default function ReviewPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const isExpandedReviewFromLocation =
    location.state?.isExpandedReview || false;
  const backLinkHref = location.state?.from ?? '/products';

  //   const { productId } = useParams();
  //   const allProducts = useSelector(getAllProducts);
  //   console.log('allProducts:', allProducts);
  //   const product = allProducts?.find(p => p._id === productId);

  // оновлення стану при завантаженні компонента
  useEffect(() => {
    if (!isExpandedReviewFromLocation) {
      // Перейти назад на сторінку ProductDetailPage
      navigate(`../`, { state: { isExpandedReview: false } });
    }
  }, [navigate, isExpandedReviewFromLocation]);

  //   if (!product) {
  //     return <p>Товар не знайдено</p>;
  //   }

  return (
    <div>
      <div className={styles.reviewList}>
        {fakeReviewsData.map(review => (
          <ReviewItem key={review.id} review={review} />
        ))}
      </div>
      <Link to={backLinkHref} className={styles.readMoreLink}>
        <p className={styles.readMoreButton}>Назад</p>
        <DropdownArrowIcon
          className={`${styles.readMoreIcon} ${styles['readMoreIcon-reverse']} `}
        />
      </Link>
    </div>
  );
}
