// import { useState } from 'react';
import { useParams, Outlet, useLocation } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
// import { getAllProducts } from 'redux/products/productsSelectors';

// import Heading from 'shared/components/Heading';
// import Image from 'shared/components/Image';
// import StarEmpty from 'shared/icons/StarEmpty';
// import DropdownArrowIcon from 'shared/icons/DropdownArrowIcon';

// import styles from './ProductDetailPage.module.scss';
// import Button from 'shared/components/Button';

// export default function ProductDetailPage() {
//   const [isExpanded, setIsExpanded] = useState(false);

//   const location = useLocation();
//   const from = location.state?.from || '/';

//   // Отримуємо isExpanded з location.state
//   const isExpandedFromLocation = location.state?.isExpanded || false;

//   // Встановлюємо isExpanded залежно від значення isExpandedFromLocation
//   if (isExpanded !== isExpandedFromLocation) {
//     setIsExpanded(isExpandedFromLocation);
//   }

//   const { productId } = useParams();

//   const allProducts = useSelector(getAllProducts);

//   const product =
//     allProducts && allProducts.products?.find(p => p._id === productId);

//   const handleReadMoreClick = () => {
//     setIsExpanded(true);
//   };

//   if (!product) {
//     return <p>Товар не знайдено</p>;
//   }

//   const { name } = product;

//   console.log(' setIsExpanded', isExpanded);

//   return (
//     <>
//       <Heading withGoBack>{name}</Heading>
//       <div className={styles.productCard}>
//         <div className={styles.rating}>
//           <StarEmpty />
//           <StarEmpty />
//           <StarEmpty />
//           <StarEmpty />
//           <StarEmpty />
//           <p className={styles.ratingText}>100 відгуків</p>
//         </div>

//         <Image className={styles.image} src={product.picture} />

//         <div className={styles.imageSliderContainer}>
//           <Image className={styles.imageSlider} src={product.picture} />
//           <Image className={styles.imageSlider} src={product.picture} />
//         </div>
//         <div className={styles.contentContainer}>
//           <p className={styles.contentText}>
//             <span className={styles.contentHeader}>СКЛАД:</span>
//             {product.description}
//           </p>
//         </div>
//         <div className={styles.price}>
//           <h3>
//             {product.price} {product.currencyId}
//           </h3>
//           <div className={styles.amount}>
//             <Button
//               mode={'adding'}
//               style={{ minWidth: '24px', fill: '#f3a610' }}
//             ></Button>
//             <h3>1</h3>
//             <Button
//               mode={'adding'}
//               style={{ minWidth: '24px', fill: '#f3a610' }}
//             ></Button>
//           </div>
//         </div>

//         <Button
//           type="submit"
//           style={{ paddingLeft: 86, paddingRight: 86, marginTop: 33 }}
//         >
//           Додати в кошик
//         </Button>

//         <div className={styles.descriptionContainer}>
//           {product ? (
//             isExpanded ? (
//               <Outlet />
//             ) : (
//               <>
//                 <h3 style={{ marginBottom: 8 }}>Опис</h3>
//                 <p className={styles.descriptionText}>
//                   {product.description.slice(0, 20)}
//                 </p>
//                 {!isExpanded && (
//                   <Link
//                     to={`description`}
//                     state={{ from: location, isExpanded: true }}
//                     className={styles.readMoreLink}
//                     onClick={handleReadMoreClick}
//                   >
//                     <p className={styles.readMoreButton}>Читати повністю</p>
//                     <DropdownArrowIcon className={`${styles.readMoreIcon} `} />
//                   </Link>
//                 )}
//               </>
//             )
//           ) : (
//             <p>Завантаження...</p>
//           )}
//         </div>
//         <div className={styles.rewieContainer}>
//           <Link to={`rewie`} state={{ from: location }}>
//             <div className={styles.rewieTitleContainer}>
//               <h3 className={styles.rewieTitle}>
//                 Відгуки покупців <span className={styles.rewieCount}>(8)</span>
//               </h3>
//             </div>

//             <p className={styles.descriptionText}>
//               Ваші відгуки допоможуть іншим у виборі смаколика для свого
//               улюбленця!
//             </p>
//             <Button
//               type="submit"
//               mode="outlined"
//               style={{ paddingLeft: 86, paddingRight: 86, marginTop: 20 }}
//             >
//               Залишити відгук
//             </Button>
//           </Link>
//         </div>
//       </div>
//     </>
//   );
// }
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getAllProducts } from 'redux/products/productsSelectors';
import Heading from 'shared/components/Heading';
import ProductDetail from 'components/ProductDetail/ProductDetail';
import styles from './ProductDetailPage.module.scss';

export default function ProductDetailPage({}) {
  const { productId } = useParams();
  const location = useLocation();
  const from = location.state?.from || '/';

  const allProducts = useSelector(getAllProducts);
  const product = allProducts?.find(p => p._id === productId);

  const [isExpandedDescription, setIsExpandedDescription] = useState(false);
  const [isExpandedReview, setIsExpandedReview] = useState(false);

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
  };

  const handleReadReviewClick = () => {
    setIsExpandedReview(true);
  };

  if (!product) {
    return <p>Товар не знайдено</p>;
  }

  return (
    <>
      <Heading withGoBack fromHC={'/shop/product-list-page'}>
        {product.name}
      </Heading>
      <ProductDetail
        product={product}
        isExpandedDescription={isExpandedDescription}
        isExpandedReview={isExpandedReview}
        handleReadMoreClick={handleReadMoreClick}
        handleReadReviewClick={handleReadReviewClick}
      />
    </>
  );
}
