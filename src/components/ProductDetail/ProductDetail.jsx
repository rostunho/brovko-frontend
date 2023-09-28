import Heading from 'shared/components/Heading';
import Image from 'shared/components/Image';
import Button from 'shared/components/Button';
import Rating from 'components/ProductDetail/Rating';
import ImageSlider from 'components/ProductDetail/ImageSlider';
import Content from 'components/ProductDetail/Content';
import Price from 'components/ProductDetail/Price';
import Description from 'components/ProductDetail/ProductDescription/Description';
import Review from 'components/ProductDetail/ProductReview/Review';

import styles from './ProductDetail.module.scss';

export default function ProductDetail({
  product,
  reviews,
  isExpandedDescription,
  isExpandedReview,
  handleReadMoreClick,
  handleReadReviewClick,
  location,
}) {
  const { picture, note, price, currencyId } = product;

  return (
    <>
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
          reviews={reviews}
        />{' '}
      </div>
    </>
  );
}
