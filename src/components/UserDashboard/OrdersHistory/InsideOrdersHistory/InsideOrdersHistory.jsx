import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from 'shared/components/Button';
import DownArrowIcon from 'shared/icons/DownArrowIcon';
import UpArrowIcon from 'shared/icons/UpArrowIcon';
import OrderInformation from '../OrderInformation';

import { ordersUserHistory } from 'redux/user/userSelectors';

import styles from './InsideOrdersHistory.module.scss';

const InsideOrdersHistory = () => {
  const orders = useSelector(ordersUserHistory);

  const [openDetails, setOpenDetails] = useState({});

  const toggleShowDetailsOrder = orderId => {
    setOpenDetails(prevState => ({
      ...prevState,
      [orderId]: !prevState[orderId],
    }));
  };

  const navigate = useNavigate();
  const goToProducts = () => {
    navigate('/shop/product-list-page');
  };

  return (
    <>
      {!orders.length ? (
        <div>
          <p className={styles.text}>Ваш пес досі просить паляничку</p>
          <Button type="button" size="lg" onClick={goToProducts}>
            <p className={styles.spam}>Перейти до смаколиків</p>
          </Button>
        </div>
      ) : (
        <ul>
          {orders.map(order => (
            <li key={order.data.id}>
              <div className={styles.wrapperOrder}>
                <div className={styles.wrapperText}>
                  <p className={styles.numberOrder}>
                    №{order.data.id} {order.data.orderTime}
                  </p>
                  <Button
                    type="button"
                    size="settings"
                    onClick={() => toggleShowDetailsOrder(order.data.id)}
                  >
                    {openDetails[order.data.id] ? (
                      <UpArrowIcon />
                    ) : (
                      <DownArrowIcon />
                    )}
                  </Button>
                </div>
                <p className={styles.statusOrder}>
                  {order.meta.fields.statusId.label}
                </p>
                <div className={styles.wrapperText}>
                  <p className={styles.quantityOrder}>Кількість товарів</p>
                  <p className={styles.quantityOrderSpam}>
                    {order.data.products.length} шт
                  </p>
                </div>
                <div className={styles.wrapperText}>
                  <p className={styles.sumOrder}>Сума замовлення</p>
                  <p className={styles.sumOrderSpam}>
                    {order.data.products.reduce(
                      (subtotal, { price, amount }) =>
                        subtotal + price * amount,
                      0
                    )}{' '}
                    ₴
                  </p>
                </div>
                {openDetails[order.data.id] && (
                  <OrderInformation order={order} />
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default InsideOrdersHistory;
