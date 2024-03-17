import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { removeProduct } from 'shared/services/api/brovko/products';
import { removeProductRequestTemplate } from './removeProductRequestTemplate';
import { selectUserStatus } from 'redux/user/userSelectors';
import ProductsItem from '../ProductsItem';
import AdminControlPanel from 'shared/components/AdminControlPanel/AdminControlPanel';
import styles from './ProductsList.module.scss';

export default function ProductList({ products }) {
  const [adminInCustomerMode, setAdminInCustomerMode] = useState(false);
  const [idsOfSelectedProducts, setIdsOfSelectedProducts] = useState([]);
  const userStatus = useSelector(selectUserStatus);
  const navigate = useNavigate();
  const location = useLocation();

  const handleAddProduct = () => {
    navigate(`/admin/add-product`, {
      state: { from: location.pathname + location.search },
    });
  };

  console.log('location', location.pathname !== '/404');

  const handleRemoveProducts = async () => {
    const body = removeProductRequestTemplate;
    body.product = idsOfSelectedProducts.map(id => ({ id }));
    await removeProduct(body);
  };

  const handleEditProduct = () => {
    if (idsOfSelectedProducts.length !== 1) {
      return;
    }

    const selectedId = idsOfSelectedProducts.join();
    const targetProduct = products.find(product => product.id === selectedId);

    // console.log('brovkoId :>> ', targetProduct);
    navigate(`/admin/add-product/${targetProduct._id}`, {
      state: { from: location.pathname + location.search },
    });
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
    setIdsOfSelectedProducts(prevState => [...prevState, id]);
  };

  const removeProductIdToDeletingList = id => {
    setIdsOfSelectedProducts(prevState => {
      const idIdx = prevState.indexOf(id);
      const newState = [...prevState];
      newState.splice(idIdx, 1);
      return newState;
    });
  };

  return (
    <>
      <div className={styles.products} style={{ position: 'relative' }}>
        {location.pathname !== '/404' &&
          (userStatus === 'manager' || userStatus === 'superadmin') && (
            <AdminControlPanel
              editDisabled={!(idsOfSelectedProducts.length === 1)}
              deleteDisabled={idsOfSelectedProducts.length < 1}
              onAddClick={handleAddProduct}
              onEditClick={handleEditProduct}
              onDeleteClick={handleRemoveProducts}
              viewMode={adminInCustomerMode}
              onViewModeClick={handleViewMode}
            />
          )}
        {products?.length ? (
          <ul className={styles.list}>
            {products.map(product => (
              <li key={product._id} className={styles['list-item']}>
                <ProductsItem
                  product={product}
                  onChange={getItemsForRemoving}
                  userStatus={(location.pathname !== '/404') && userStatus}
                  adminInCustomerMode={
                    (location.pathname !== '/404') && adminInCustomerMode
                  }
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
