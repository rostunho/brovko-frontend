import { Suspense, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectIsLogin } from 'redux/user/userSelectors';
import Heading from 'shared/components/Heading';
import CustomerSwitcher from 'components/CustomerSwitcher';
import OrderList from 'shared/components/OrderList';
import Modal from 'shared/components/Modal/Modal';
import ModalDelete from 'components/ModalDelete/ModalDelete';
import ModalBasketIsEmpty from 'components/ModalBasketIsEmpty/ModalBasketIsEmpty';
import SEO from 'components/SEO/SEO';
import styles from './OrderPage.module.scss';

import useProductInBasket from 'shared/hooks/useProductInBasket';

export default function OrderPage() {
  const [modalDelete, setModalDelete] = useState(false);
  const [orderId, setOrderId] = useState('');
  const userIsLoggedIn = useSelector(selectIsLogin);

  console.log('modalDelete', modalDelete);

  const { showBascketOrders } = useProductInBasket();
  const products = showBascketOrders();

  const handleCloseModal = () => {
    setModalDelete(false);
  };

  const navigate = useNavigate();
  const hendlClickReturn = () => {
    navigate('/shop/product-list-page');
  };
  return (
    <div className={styles.container}>
      <Heading>Оформлення замовлення</Heading>
      <SEO
        title="Оформлення замовлення | Brovko"
        description="Оформлення замовлення | Brovko - крамничка натуральних смоколиків для собак"
        url="/order/login"
      />
      <div className={styles['order-invoice']}>
        {products.length ? (
          !modalDelete ? (
            <OrderList
              totalLabel="Ваше замовлення на суму:"
              lastCheck
              setModalDelete={setModalDelete}
              setOrderId={setOrderId}
            />
          ) : (
            <Modal closeModal={handleCloseModal}>
              <ModalDelete setModalDelete={setModalDelete} orderId={orderId} />
            </Modal>
          )
        ) : (
          <Modal closeModal={handleCloseModal}>
            <ModalBasketIsEmpty hendlClickReturn={hendlClickReturn} />
          </Modal>
        )}

        {!userIsLoggedIn && <CustomerSwitcher />}
        <Suspense>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
}
