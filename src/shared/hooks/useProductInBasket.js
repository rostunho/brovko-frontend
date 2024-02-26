import { useSelector, useDispatch } from 'react-redux';
import { getAllOrders } from 'redux/basket/basketSelectors';
import { selectUser } from 'redux/user/userSelectors';
import { addOrder } from 'redux/basket/basketSlice';
import { deleteOrder } from 'redux/basket/basketSlice';
import { addPopupOperation } from 'redux/popup/popupOperations';
import { update } from 'redux/user/userOperations';

const useProductInBasket = () => {
  const dispatch = useDispatch();
  const orders = useSelector(getAllOrders);
  const { user, isLogin } = useSelector(selectUser);
  // const { isOpen } = useModal();

  // useEffect(() => {
  //   console.log('useEffect');
  //   if (userIsLoggedIn) {
  //     const dataToUpdate = {
  //       id: user._id,
  //       ...user,
  //       productInBasket,
  //     };

  //     try {
  //       dispatch(dispatch => {
  //         dispatch(update(dataToUpdate));
  //       });
  //     } catch (error) {
  //       console.error('Error during user update:', error);
  //     }
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [productInBasket]);

  const showBascketOrders = () => {
    const products = isLogin ? user?.productInBasket : orders;
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
      const updatedUser = {
        id: user._id,
        ...user,
        productInBasket: [...user.productInBasket, { ...product, value }],
      };
      console.log('updatedUser', updatedUser);
      dispatch(update(updatedUser));
    } else {
      dispatch(addOrder({ ...product, value }));
    }
    dispatch(addPopupOperation('Товар додано в кошик'));
  };

  const hahdleBasketDel = ({ setModalDelete, orderId }) => {
    if (isLogin) {
      const updateBasket = user.productInBasket.filter(
        order => order._id !== orderId
      );
      const updatedUser = {
        id: user._id,
        ...user,
        productInBasket: updateBasket,
      };
      dispatch(update(updatedUser));
    } else {
      dispatch(deleteOrder(orderId));
    }
    setModalDelete(false);
  };

  const hahdleBasketClose = ({ setModalDelete }) => {
    setModalDelete(false);
  };

  const updateUserBasket = ({ id, value }) => {
    const orderToUpdateIndex = user.productInBasket.findIndex(
      order => order._id === id
    );

    if (orderToUpdateIndex !== -1) {
      const updatedProductInBasket = [...user.productInBasket];
      const oldValue = updatedProductInBasket[orderToUpdateIndex].value;

      if (oldValue !== value) {
        updatedProductInBasket[orderToUpdateIndex] = {
          ...updatedProductInBasket[orderToUpdateIndex],
          value: value,
        };

        const updatedUser = {
          id: user._id,
          ...user,
          productInBasket: updatedProductInBasket,
        };
        console.log('update');
        dispatch(update(updatedUser));
      }
    }
  };

  return {
    showBascketOrders,
    handleAddToCart,
    hahdleBasketDel,
    hahdleBasketClose,
    updateUserBasket,
  };
};

export default useProductInBasket;
