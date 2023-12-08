import { useState } from 'react';
import ProductsItem from '../ProductsItem';
import styles from './ProductsList.module.scss';

const ProductList = ({ products, sortedProducts }) => {
  const [productIdsForRemoving, setProductIdsForRemoving] = useState([]);

  const getItemsForRemoving = (id, checked) => {
    console.log('DATA IN PRODUCT LIST :', { id: id, checked: checked });

    checked
      ? addProductIdToDeletingList(id)
      : removeProductIdToDeletingList(id);

    console.log('productIdsForRemoving :>> ', productIdsForRemoving);
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
      {sortedProducts.length > 0 ? (
        <ul className={styles.list}>
          {sortedProducts.map(product => (
            <li key={product._id}>
              <ProductsItem product={product} onChange={getItemsForRemoving} />
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
