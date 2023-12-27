import { useState } from 'react';
import { removeProduct } from 'shared/services/api/brovko/products';
import { removeProductRequestTemplate } from './removeProductRequestTemplate';
import { selectUserStatus } from 'redux/user/userSelectors';
import ProductsItem from '../ProductsItem';
import Button from 'shared/components/Button';
import styles from './ProductsList.module.scss';
import { useSelector } from 'react-redux';

const ProductList = ({ products, sortedProducts, refetchProducts }) => {
  const [adminInCustomerMode, setAdminInCustomerMode] = useState(false);
  const [productIdsForRemoving, setProductIdsForRemoving] = useState([]);
  const userStatus = useSelector(selectUserStatus);

  const handleRemoveProducts = async () => {
    const body = removeProductRequestTemplate;
    // console.log('body.product :>> ', body.product);

    body.product = productIdsForRemoving.map(id => ({ id }));
    // console.log('body.product after mapping:>> ', body.product);
    // console.log('body after mapping :>>', body);

    await removeProduct(body);
    await refetchProducts();

    // console.log('response :>> ', response);
  };

  const handleViewMode = () => {
    setAdminInCustomerMode(!adminInCustomerMode);
  };

  const getItemsForRemoving = (id, checked) => {
    // console.log('DATA IN PRODUCT LIST :', { id: id, checked: checked });

    checked
      ? addProductIdToDeletingList(id)
      : removeProductIdToDeletingList(id);

    // console.log('productIdsForRemoving :>> ', productIdsForRemoving);
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

  if (!products) {
    return null;
  }

  return (
    <div className={styles.products}>
      {(userStatus === 'manager' || userStatus === 'superadmin') && (
        <ul className={styles['buttons-list']}>
          <li className={styles['buttons-item']}>
            <Button
              // className={styles['admin-button']}
              admin
              size="lg"
              disabled={productIdsForRemoving.length < 1}
              onClick={handleRemoveProducts}
            >
              Видалити
            </Button>
          </li>
          <li className={styles['buttons-item']}>
            <Button
              // className={styles['admin-button']}
              admin
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
      {products.length > 0 ? (
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
  );
};

export default ProductList;
