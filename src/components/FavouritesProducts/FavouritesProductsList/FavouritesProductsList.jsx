import React, { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';

import { selectUserStatus } from 'redux/user/userSelectors';

import ProductsItem from 'components/Products/ProductsItem';
import Pagination from 'components/Products/Pagination';

import styles from '../../Products/ProductsList/ProductsList.module.scss';
import Input from 'shared/components/Input';

const FavouritesProductsList = () => {
  const userStatus = useSelector(selectUserStatus);

  const { favouriteProducts, user, isLogin } = useSelector(({ user }) => user);
  console.log('favouriteProducts', favouriteProducts);
  console.log('user', user);
  console.log('isLogin', isLogin);
  const products = isLogin ? user?.favouriteProducts : favouriteProducts;

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const perPage = 10;
  const [adminInCustomerMode, setAdminInCustomerMode] = useState(false);
  const [productIdsForRemoving, setProductIdsForRemoving] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  console.log(filteredProducts);

  useEffect(() => {
    const newTotalPages = Math.ceil(filteredProducts.length / perPage);
    setTotalPages(newTotalPages);

    if (searchTerm && totalPages < 2) {
      setCurrentPage(1);
    }
  }, [filteredProducts, perPage, searchTerm, totalPages]);

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

  const handleChangePage = pageNumber => {
    setCurrentPage(pageNumber);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleSearch = term => {
    setSearchTerm(term);
  };

  return (
    <>
      <div className={styles.searchContainer}>
        <Input
          name="searchbar"
          label=""
          type="search"
          value={searchTerm}
          onChange={e => handleSearch(e.target.value)}
        />
      </div>
      <div className={styles.products} style={{ position: 'relative' }}>
        {filteredProducts.length > 0 ? (
          <ul className={styles.list}>
            {filteredProducts
              .slice((currentPage - 1) * perPage, currentPage * perPage)
              .map(product => (
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
      {totalPages !== 1 && (
        <Pagination
          page={currentPage}
          totalPages={totalPages}
          onChangePage={handleChangePage}
        />
      )}
    </>
  );
};

export default FavouritesProductsList;
