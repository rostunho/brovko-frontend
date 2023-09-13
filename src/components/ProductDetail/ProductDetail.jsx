import { useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
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
import Review from 'components/ProductDetail/Rewiew';

import styles from './ProductDetail.module.scss';

export default function ProductDetail() {
  const { productId } = useParams();
  const location = useLocation();
  const from = location.state?.from || '/';
  const allProducts = useSelector(getAllProducts);
  const product = allProducts?.find(p => p._id === productId);

  console.log('allProducts', allProducts);
  console.log('product', product);
  console.log('productID', productId);

  const [isExpanded, setIsExpanded] = useState(false);
  // Отримуємо isExpanded з location.state
  const isExpandedFromLocation = location.state?.isExpanded || false;
  // Встановлюємо isExpanded залежно від значення isExpandedFromLocation
  if (isExpanded !== isExpandedFromLocation) {
    setIsExpanded(isExpandedFromLocation);
  }

  const handleReadMoreClick = () => {
    setIsExpanded(true);
  };

  if (!product) {
    return <p>Товар не знайдено</p>;
  }

  const { name, picture, note, price, currencyId } = product;

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
          isExpanded={isExpanded}
          location={location}
          handleReadMoreClick={handleReadMoreClick}
        />
        <Review
          isExpanded={isExpanded}
          location={location}
          handleReadMoreClick={handleReadMoreClick}
        />
      </div>
    </>
  );
}
