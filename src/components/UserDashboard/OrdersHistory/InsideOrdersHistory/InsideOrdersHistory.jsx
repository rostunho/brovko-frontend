import { useState } from 'react';
import { useSelector } from 'react-redux';
import Button from 'shared/components/Button';
import DownArrowIcon from 'shared/icons/DownArrowIcon';
import UpArrowIcon from 'shared/icons/UpArrowIcon';
import OrderInformation from '../OrderInformation';

import { getAllOrders } from 'redux/basket/basketSelectors';

import styles from './InsideOrdersHistory.module.scss';

const InsideOrdersHistory = () => {
  const orders = useSelector(getAllOrders);

  const [showDetail, setShowdetail] = useState(false);

  const toggleShowDetailsOrder = () => {
    setShowdetail(!showDetail);
  };

  const goToOrders = () => {
    console.log(goToOrders);
  };

  return (
    <>
      {!orders ? (
        <div>
          <p className={styles.text}>У Вас немає попередніх замовлень</p>
          <Button type="button" size="lg" onClick={goToOrders}>
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
              <p className={styles.quantityOrderSpam}>3 шт</p>
            </div>
            <div className={styles.wrapperText}>
              <p className={styles.sumOrder}>Сума замовлення</p>
              <p className={styles.sumOrderSpam}>108 ₴</p>
            </div>
            {!showDetail && <OrderInformation />}
          </div>
        </div>
      )}
    </>
  );
};

export default InsideOrdersHistory;
