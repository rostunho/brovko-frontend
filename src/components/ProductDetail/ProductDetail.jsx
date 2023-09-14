import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useParams, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAllProducts } from 'redux/products/productsSelectors';

import Heading from 'shared/components/Heading';
import Image from 'shared/components/Image';
import Button from 'shared/components/Button';
import Rating from 'components/ProductDetail/Rating';
import ImageSlider from 'components/ProductDetail/ImageSlider';
import Content from 'components/ProductDetail/Content';
import Price from 'components/ProductDetail/Price';
import Description from 'components/ProductDetail/Description';
import ReviewContainer from './ReviewContainer';
import Review from 'components/ProductDetail/Review';

import styles from './ProductDetail.module.scss';

export default function ProductDetail() {
  const { productId } = useParams();
  const location = useLocation();
  const from = location.state?.from || '/';
  const allProducts = useSelector(getAllProducts);
  const product = allProducts?.find(p => p._id === productId);

  // console.log('allProducts', allProducts);
  // console.log('product', product);
  // console.log('productID', productId);

  const [isExpandedDescription, setIsExpandedDescription] = useState(false);
  const [isExpandedReview, setIsExpandedReview] = useState(false);
  console.log('isExpandedDescription', isExpandedDescription);
  console.log('isExpandedReview', isExpandedReview);

  useEffect(() => {
    // Встановлюємо isExpandedDescription з location.state
    const isExpandedDescriptionFromLocation =
      location.state?.isExpandedDescription || false;
    setIsExpandedDescription(isExpandedDescriptionFromLocation);

    // Встановлюємо isExpandedReview з location.state
    const isExpandedReviewFromLocation =
      location.state?.isExpandedReview || false;
    setIsExpandedReview(isExpandedReviewFromLocation);
  }, [location.state]);

  const handleReadMoreClick = () => {
    setIsExpandedDescription(true);
    console.log('isExpandedDescription click', isExpandedDescription);
  };

  const handleReadReviewClick = () => {
    setIsExpandedReview(true);
  };

  if (!product) {
    return <p>Товар не знайдено</p>;
  }

  const { name, picture, note, price, currencyId, review } = product;

  console.log('note', note);

  return (
    <>
      <Heading withGoBack>{name}</Heading>
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
        <ReviewContainer />
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
