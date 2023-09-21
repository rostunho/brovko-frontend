import { useHistory } from 'react-router-dom';

import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useParams, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAllProducts } from 'redux/products/productsSelectors';

import Heading from 'shared/components/Heading';
import GoBackButton from 'shared/components/GoBackButton/GoBackButton';
import Image from 'shared/components/Image';
import Button from 'shared/components/Button';
import Rating from 'components/ProductDetail/Rating';
import ImageSlider from 'components/ProductDetail/ImageSlider';
import Content from 'components/ProductDetail/Content';
import Price from 'components/ProductDetail/Price';
import Description from 'components/ProductDetail/ProductDescription/Description';
import ReviewContainer from './ProductReview/ReviewContainer';
import Review from 'components/ProductDetail/ProductReview/Review';

import styles from './ProductDetail.module.scss';

export default function ProductDetail() {
  const { productId } = useParams();
  const location = useLocation();
  const from = location.state?.from || '/shop/product-list-page';
  console.log('from:', from);

  const allProducts = useSelector(getAllProducts);
  const product = allProducts?.find(p => p._id === productId);

  const [isExpandedDescription, setIsExpandedDescription] = useState(false);
  const [isExpandedReview, setIsExpandedReview] = useState(false);

  useEffect(() => {
    // Встановлюємо isExpandedDescription з location.state
    const isExpandedDescriptionFromLocation =
      location.state?.isExpandedDescription || false;
    setIsExpandedDescription(isExpandedDescriptionFromLocation);
    console.log('isExpandedDescription', isExpandedDescription);

    // Встановлюємо isExpandedReview з location.state
    const isExpandedReviewFromLocation =
      location.state?.isExpandedReview || false;
    setIsExpandedReview(isExpandedReviewFromLocation);
    console.log('isExpandedReview', isExpandedReview);
  }, [location.state]);

  const handleReadMoreClick = () => {
    setIsExpandedDescription(true);
  };

  const handleReadReviewClick = () => {
    setIsExpandedReview(true);
  };

  if (!product) {
    return <p>Товар не знайдено</p>;
  }

  const { name, picture, note, price, currencyId, review } = product;

  return (
    <>
      <div className={styles.titleContainer}>
        <GoBackButton from={'/shop/product-list-page'} />
        <h2 className={styles.title}>{name}</h2>
      </div>

      <div className={styles.productCard}>
        <Rating />
        <Image className={styles.image} src={picture} />
        <ImageSlider picture={picture} />
        <Content note={note} />
        <Price price={price} currencyId={currencyId} />
        <Button
          type="submit"
          style={{ paddingLeft: 86, paddingRight: 86, marginTop: 33 }}
        >
          Додати в кошик
        </Button>
        <Description
          product={product}
          isExpandedDescription={isExpandedDescription}
          location={location}
          handleReadMoreClick={handleReadMoreClick}
        />
        <Review
          isExpandedReview={isExpandedReview}
          location={location}
          handleReadReviewClic={handleReadReviewClick}
          review={review}
        />{' '}
      </div>
    </>
  );
}
