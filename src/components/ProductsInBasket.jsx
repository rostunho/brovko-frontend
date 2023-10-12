import Button from 'shared/components/Button';
import Heading from 'shared/components/Heading';
import OrderList from 'shared/components/OrderList';

import styles from './ProductsInBasket.module.scss';

const ProductInBasket = ({
  setModalDelete,
  setOrderId,
  hendlClickReturn,
  hendlClickOrder,
}) => {
  return (
    <>
      <Heading>Товари у кошику</Heading>
      <OrderList
        totalLabel="Загальна сума:"
        setModalDelete={setModalDelete}
        setOrderId={setOrderId}
      />
      <div className={styles.wrapperButton}>
        <Button
          mode="outlined"
          size="lg"
          style={{ marginBottom: '12px' }}
          onClick={hendlClickReturn}
        >
          Повернутись до покупок
        </Button>
        <Button mode="primary" size="lg" onClick={hendlClickOrder}>
          Оформити замовлення
        </Button>
      </div>
    </>
  );
};

export default ProductInBasket;
