import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addOrder } from 'redux/basket/basketSlice';
import { Link, useParams } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';

import { getAllOrders } from 'redux/basket/basketSelectors';
import { selectUser } from 'redux/user/userSelectors';
import { getProductById } from 'shared/services/api';
import { addPopupOperation } from 'redux/popup/popupOperations';
import { update } from 'redux/user/userOperations';
import {
  addItemToFavourite,
  removeItemFromFavourite,
} from 'redux/user/userSlice';

import StarEmpty from 'shared/icons/StarEmpty';
import Button from 'shared/components/Button/Button';
import Image from 'shared/components/Image';
import Input from 'shared/components/Input';

import HeartIcon from 'shared/icons/HeartIcon';

import styles from './ProductsItem.module.scss';

const ProductsItem = ({
  product,
  onChange,
  userStatus,
  adminInCustomerMode,
}) => {
  // const [product, setProduct] = useState(null);
  const [cardIsSelected, setCardIsSelected] = useState(false);
  // const [isFavourite, setIsFavourite] = useState(false);
  // console.log(product);

  // const { productId } = useParams();
  // console.log('useParams', productId);

  const location = useLocation();

  const orders = useSelector(getAllOrders);
  const dispatch = useDispatch();

  const { favouriteProducts, user, isLogin } = useSelector(({ user }) => user);

  // useEffect(() => {
  //   getProductById(productId).then(product => setProduct(product));
  // }, [productId]);

  useEffect(() => {
    onChange && onChange(product.id, cardIsSelected);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardIsSelected]);

  const handleCardSelecting = () => {
    setCardIsSelected(!cardIsSelected);
  };

  const handleAddPopup = text => {
    dispatch(addPopupOperation(text));
  };

  const handleAddToCart = () => {
    const result = orders.some(order => order._id === product._id);
    if (result) {
      handleAddPopup('Товар вже знаходиться в кошику');
      return;
    }
    dispatch(addOrder({ ...product, value: 1 }));
    dispatch(addPopupOperation('Товар додано в кошик'));
  };

  const isProductFavourite = user => {
    return user.some(p => p.id === product.id);
  };

  const updatedFavourites = user => {
    return user?.favouriteProducts.filter(p => p.id !== product.id);
  };

  const handleToggleFavourite = () => {
    if (isLogin) {
      const isFavouriteInUser = isProductFavourite(user.favouriteProducts);

      if (isFavouriteInUser) {
        // The product is already a favourite, so remove it from your favourites

        const isProductInFavourites = updatedFavourites(user);
        const updatedUser = {
          id: user._id,
          ...user,
          favouriteProducts: isProductInFavourites,
        };
        dispatch(update(updatedUser));
        dispatch(addPopupOperation('Товар видалено з улюблених'));
        return;
      }
      // The product is not in favourites, so add it

      const updatedUser = {
        id: user._id,
        ...user,
        favouriteProducts: [...user.favouriteProducts, product],
      };
      dispatch(update(updatedUser));
      dispatch(addPopupOperation('Товар додано в улюблені'));
      return;
    }

    // For unauthorised users, save and delete from localStorage

    const isFavouriteInStorage = isProductFavourite(favouriteProducts);

    if (isFavouriteInStorage) {
      dispatch(removeItemFromFavourite(product.id));
      dispatch(addPopupOperation('Товар видалено з улюблених'));
      return;
    }
    dispatch(addItemToFavourite(product));
    dispatch(addPopupOperation('Товар додано в улюблені'));
  };

  const isFavourite =
    isLogin && Array.isArray(user.favouriteProducts)
      ? user.favouriteProducts.some(p => p.id === product.id)
      : Array.isArray(favouriteProducts)
      ? favouriteProducts.some(p => p.id === product.id)
      : false;

  return (
    <div
      className={`${styles.productCard} ${
        cardIsSelected ? styles['productCard--selected'] : ''
      }`}
    >
      <div className={styles.image}>
        {(userStatus === 'manager' || userStatus === 'superadmin') &&
          !adminInCustomerMode && (
            <div className={styles['checkbox-backdrop']}>
              <Input
                type="checkbox"
                className={styles.checkbox}
                inputClassName={styles['checkbox-input']}
                value={cardIsSelected}
                onChange={handleCardSelecting}
              />
            </div>
          )}

        <HeartIcon
          className={`${styles.heart_icon} ${
            isFavourite ? styles.heart_icon_checked : ''
          }`}
          checked={isFavourite}
          onClick={handleToggleFavourite}
        />

        <Image src={product.picture} className={styles.picture} />
      </div>

      <div className={styles.description}>
        <div className={styles.info}>
          <div className={styles.textDesc}>
            <p className={styles.name}>{product.name}</p>
            <p className={styles.price}>{product.price} грн</p>
          </div>
          <div className={styles.rating}>
            <StarEmpty />
            <StarEmpty />
            <StarEmpty />
            <StarEmpty />
            <StarEmpty />
          </div>
        </div>
        <div className={styles.buttons}>
          <Link
            to={`/shop/product/${product._id}`}
            state={{ from: location.pathname }}
          >
            <Button mode="outlined">Подробиці</Button>
          </Link>

          <Button onClick={handleAddToCart} mode="primary">
            В кошик
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductsItem;
