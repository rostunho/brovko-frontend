import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllOrders } from 'redux/basket/basketSelectors';

import Modal from 'shared/components/Modal/Modal';
import ModalDelete from 'components/ModalDelete/ModalDelete';
import ProductInBasket from 'components/ProductsInBasket/ProductsInBasket';
import ModalBasketIsEmpty from 'components/ModalBasketIsEmpty/ModalBasketIsEmpty';
import { selectUser } from 'redux/user/userSelectors';

import { productInBasket } from 'redux/user/userOperations';

import useProductInBasket from 'shared/hooks/useProductInBasket';

const ModalProductsInBasket = ({ closeModal }) => {
  const [modalDelete, setModalDelete] = useState(false);
  const [orderId, setOrderId] = useState('');

  // const userStatus = useSelector(selectUserStatus);

  const { showBascketOrders } = useProductInBasket();
  const products = showBascketOrders();

  // const { productInBasket, user, isLogin } = useSelector(selectUser);
  // console.log('productInBasket', productInBasket);
  // console.log('user', user);
  // const orders = useSelector(getAllOrders);
  // console.log('orders', orders);
  // const products = isLogin ? user?.productInBasket : orders;

  const navigate = useNavigate();

  const hendlClickReturn = () => {
    navigate('/shop/product-list-page');
    closeModal();
  };

  const hendlClickOrder = () => {
    navigate('/order');
    closeModal();
  };

  return (
    <div>
      <Modal closeModal={closeModal}>
        {products.length ? (
          !modalDelete ? (
            <ProductInBasket
              setModalDelete={setModalDelete}
              setOrderId={setOrderId}
              hendlClickReturn={hendlClickReturn}
              hendlClickOrder={hendlClickOrder}
            />
          ) : (
            <ModalDelete setModalDelete={setModalDelete} orderId={orderId} />
          )
        ) : (
          <ModalBasketIsEmpty hendlClickReturn={hendlClickReturn} />
        )}
      </Modal>
    </div>
  );
};
export default ModalProductsInBasket;
