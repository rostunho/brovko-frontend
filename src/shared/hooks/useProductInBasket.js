import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getAllOrders } from 'redux/basket/basketSelectors';
import { selectUser } from 'redux/user/userSelectors';
import { selectIsLogin } from 'redux/user/userSelectors';
import { addOrder } from 'redux/basket/basketSlice';
import { addOrderUser } from 'redux/user/userSlice';
import { deleteOrder } from 'redux/basket/basketSlice';
import { deleteOrderUser } from 'redux/user/userSlice';
import { addPopupOperation } from 'redux/popup/popupOperations';
import { update } from 'redux/user/userOperations';

const useProductInBasket = () => {
  const dispatch = useDispatch();
  const orders = useSelector(getAllOrders);
  const userIsLoggedIn = useSelector(selectIsLogin);
  const { productInBasket, user, isLogin } = useSelector(selectUser);

  useEffect(() => {
    if (userIsLoggedIn) {
      const dataToUpdate = {
        id: user._id,
        ...user,
        productInBasket,
      };

      try {
        dispatch(dispatch => {
          dispatch(update(dataToUpdate));
        });
      } catch (error) {
        console.error('Error during user update:', error);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productInBasket]);

  const showBascketOrders = () => {
    const products = isLogin ? user.productInBasket : orders;
    return products;
  };

  const handleAddToCart = ({ product, value, id }) => {
    const products = showBascketOrders();
    const result = products.some(order => order._id === product._id);
    if (result) {
      dispatch(addPopupOperation('Товар вже знаходиться в кошику'));
      return;
    }

    if (isLogin) {
      dispatch(addOrderUser({ ...product, value }));
    } else {
      dispatch(addOrder({ ...product, value }));
    }
    dispatch(addPopupOperation('Товар додано в кошик'));
  };

  const hahdleBasketDel = ({ setModalDelete, orderId }) => {
    if (isLogin) {
      dispatch(deleteOrderUser(orderId));
    } else {
      dispatch(deleteOrder(orderId));
    }
    setModalDelete(false);
  };

  const hahdleBasketClose = ({ setModalDelete }) => {
    setModalDelete(false);
  };

  return {
    showBascketOrders,
    handleAddToCart,
    hahdleBasketDel,
    hahdleBasketClose,
  };
};

export default useProductInBasket;
