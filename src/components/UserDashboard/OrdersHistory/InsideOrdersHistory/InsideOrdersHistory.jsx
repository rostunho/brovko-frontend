import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from 'shared/components/Button';
import DownArrowIcon from 'shared/icons/DownArrowIcon';
import UpArrowIcon from 'shared/icons/UpArrowIcon';
import OrderInformation from '../OrderInformation';

//
import { getAllOrders } from 'redux/basket/basketSelectors';
//

import { ordersUserHistory } from 'redux/user/userSelectors';

import styles from './InsideOrdersHistory.module.scss';

const InsideOrdersHistory = () => {
  const orders = useSelector(getAllOrders);
  const [showDetail, setShowdetail] = useState(false);
  const [showSumAllOrders, setshowSumAllOrders] = useState(0);

  const toggleShowDetailsOrder = () => {
    setShowdetail(!showDetail);
  };

  const navigate = useNavigate();
  const goToProducts = () => {
    navigate('/shop/product-list-page');
  };

  useEffect(() => {
    const totalAmount = orders.reduce((total, { costPerItem, amount }) => {
      return total + costPerItem * amount;
    }, 0);

    setshowSumAllOrders(totalAmount);
  }, [orders]);

  return (
    <>
      {!orders.length ? (
        <div>
          <p className={styles.text}>У Вас немає попередніх замовлень</p>
          <Button type="button" size="lg" onClick={goToProducts}>
            <p className={styles.spam}>Перейти до смаколиків</p>
          </Button>
        </div>
      ) : (
        <div>
          <div className={styles.wrapperOrder}>
            <div className={styles.wrapperText}>
              <p className={styles.numberOrder}>№ 111111 від 20.10.2023</p>
              <Button
                type="button"
                size="settings"
                onClick={toggleShowDetailsOrder}
              >
                {showDetail ? <DownArrowIcon /> : <UpArrowIcon />}
              </Button>
            </div>
            <p className={styles.statusOrder}>Виконано</p>
            <div className={styles.wrapperText}>
              <p className={styles.quantityOrder}>Кількість товарів</p>
              <p className={styles.quantityOrderSpam}>{orders.length} шт</p>
            </div>
            <div className={styles.wrapperText}>
              <p className={styles.sumOrder}>Сума замовлення</p>
              <p className={styles.sumOrderSpam}>
                {showSumAllOrders.toFixed(2)} ₴
              </p>
            </div>
            {!showDetail && (
              <OrderInformation setshowSumAllOrders={setshowSumAllOrders} />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default InsideOrdersHistory;
