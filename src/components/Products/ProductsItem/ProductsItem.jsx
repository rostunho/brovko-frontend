import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';

import { addPopupOperation } from 'redux/popup/popupOperations';
import { update } from 'redux/user/userOperations';
import {
  addItemToFavourite,
  removeItemFromFavourite,
} from 'redux/user/userSlice';

// import StarEmpty from 'shared/icons/StarEmpty';
import Raiting from 'shared/components/Raiting/Raiting';
import Button from 'shared/components/Button/Button';
import Image from 'shared/components/Image';
import Input from 'shared/components/Input';

import HeartIcon from 'shared/icons/HeartIcon';
import useProductInBasket from 'shared/hooks/useProductInBasket';

import styles from './ProductsItem.module.scss';

const ProductsItem = ({
  product,
  onChange,
  userStatus,
  adminInCustomerMode,
}) => {
  const { handleAddToCart } = useProductInBasket();
  const [cardIsSelected, setCardIsSelected] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { favouriteProducts, user, isLogin } = useSelector(({ user }) => user);

  useEffect(() => {
    onChange && onChange(product.id, cardIsSelected);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardIsSelected]);

  const onCardClick = () => {
    // to={`/shop/product/${product._id}`}
    // state={{ from: location.pathname + location.search }}

    navigate(`/shop/product/${product._id}`, {
      state: { from: location.pathname + location.search },
    });
    window.scrollTo(0, 0);
  };

  const handleCardSelecting = () => {
    setCardIsSelected(!cardIsSelected);
  };

  // const handleAddPopup = text => {
  //   dispatch(addPopupOperation(text));
  // };

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

  // console.log('isFavourite :>> ', isFavourite);

  return (
    <div
      onClick={onCardClick}
      className={`${styles.productCard} ${
        cardIsSelected ? styles['productCard--selected'] : ''
      } ${
        product.quantityInStock === 0 ? styles['productCard--notAvailable'] : ''
      }`}
    >
      {/* <Link
        to={`/shop/product/${product._id}`}
        state={{ from: location.pathname + location.search }}
        className={styles.link}
      > */}
      <div className={styles.image}>
        {(userStatus === 'manager' || userStatus === 'superadmin') &&
          !adminInCustomerMode && (
            <div className={styles['checkbox-backdrop']}>
              <Input
                type="checkbox"
                className={styles.checkbox}
                inAdminControl
                inputClassName={styles['checkbox-input']}
                value={cardIsSelected}
                onChange={e => {
                  e.stopPropagation();
                  handleCardSelecting();
                }}
              />
            </div>
          )}

        <HeartIcon
          className={`${styles.heart_icon} ${
            isFavourite ? styles.heart_icon_checked : ''
          }`}
          checked={isFavourite}
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();
            handleToggleFavourite();
          }}
        />

        {product.quantityInStock < 10 && product.quantityInStock !== 0 && (
          <div className={styles.expire}>Товар закінчується</div>
        )}

        <Image src={product.picture} className={styles.picture} />
      </div>

      <div className={styles.description}>
        <div className={styles.info}>
          <div className={styles.textDesc}>
            <p className={styles.name}>{product.name}</p>
            <p className={styles.price}>{product.price} грн</p>
          </div>
          <div className={styles.wrapper}>
            <div className={styles.rating}>
              <Raiting />
            </div>
            {product.quantityInStock === 0 && (
              <div className={styles.notAvailable}>Немає в наявності</div>
            )}
          </div>
        </div>
        <div className={styles.buttons}>
          <Button mode="outlined" className={styles['button-item']}>
            Подробиці
          </Button>
          {product.quantityInStock > 0 && (
            <Button
              className={styles['button-item']}
              onClick={e => {
                e.preventDefault();
                e.stopPropagation();
                handleAddToCart({ product, value: 1 });
              }}
              mode="primary"
            >
              В кошик
            </Button>
          )}
        </div>
      </div>
      {/* </Link> */}
    </div>
  );
};

export default ProductsItem;
