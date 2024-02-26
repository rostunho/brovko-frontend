import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Modal from 'shared/components/Modal/Modal';
import ModalDelete from 'components/ModalDelete/ModalDelete';
import ProductInBasket from 'components/ProductsInBasket/ProductsInBasket';
import ModalBasketIsEmpty from 'components/ModalBasketIsEmpty/ModalBasketIsEmpty';

import useProductInBasket from 'shared/hooks/useProductInBasket';

const ModalProductsInBasket = ({ closeModal }) => {
  const [modalDelete, setModalDelete] = useState(false);
  const [orderId, setOrderId] = useState('');

  const { showBascketOrders } = useProductInBasket();
  const products = showBascketOrders();

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
