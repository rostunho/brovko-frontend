import { useState } from 'react';
import { removeProduct } from 'shared/services/api/brovko/products';
import { removeProductRequestTemplate } from './removeProductRequestTemplate';
import { selectUserStatus } from 'redux/user/userSelectors';
import ProductsItem from '../ProductsItem';
import Button from 'shared/components/Button';
import { useSelector } from 'react-redux';
import styles from './ProductsList.module.scss';

export default function ProductList({ products }) {
  const [adminInCustomerMode, setAdminInCustomerMode] = useState(false);
  const [productIdsForRemoving, setProductIdsForRemoving] = useState([]);
  const userStatus = useSelector(selectUserStatus);

  const handleRemoveProducts = async () => {
    const body = removeProductRequestTemplate;
    body.product = productIdsForRemoving.map(id => ({ id }));
    await removeProduct(body);
  };

  const handleViewMode = () => {
    setAdminInCustomerMode(!adminInCustomerMode);
  };

  const getItemsForRemoving = (id, checked) => {
    checked
      ? addProductIdToDeletingList(id)
      : removeProductIdToDeletingList(id);
  };

  const addProductIdToDeletingList = id => {
    setProductIdsForRemoving(prevState => [...prevState, id]);
  };

  const removeProductIdToDeletingList = id => {
    setProductIdsForRemoving(prevState => {
      const idIdx = prevState.indexOf(id);
      const newState = [...prevState];
      newState.splice(idIdx, 1);
      return newState;
    });
  };

  return (
    <>
      <div className={styles.products} style={{ position: 'relative' }}>
        {(userStatus === 'manager' || userStatus === 'superadmin') && (
          <ul className={styles['buttons-list']}>
            <li className={styles['buttons-item']}>
              <Button
                admin
                className={styles.button}
                size="lg"
                disabled={productIdsForRemoving.length < 1}
                onClick={handleRemoveProducts}
              >
                Видалити
              </Button>
            </li>
            <li className={styles['buttons-item']}>
              <Button
                admin
                className={styles.button}
                size="lg"
                onClick={handleViewMode}
              >
                {adminInCustomerMode
                  ? 'Повернутись в режим Адміна'
                  : 'Переглянути в режимі покупця'}
              </Button>
            </li>
          </ul>
        )}
        {products?.length ? (
          <ul className={styles.list}>
            {products.map(product => (
              <li key={product._id}>
                <ProductsItem
                  product={product}
                  onChange={getItemsForRemoving}
                  userStatus={userStatus}
                  adminInCustomerMode={adminInCustomerMode}
                />
              </li>
            ))}
          </ul>
        ) : (
          <p>Нічого не знайдено</p>
        )}
      </div>
    </>
  );
}
