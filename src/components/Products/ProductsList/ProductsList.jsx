import { useState, useEffect } from 'react';
import {
  getAllProducts,
  getProductsByKeywords,
  getProductsByCategory,
  removeProduct,
} from 'shared/services/api/brovko/products';
import { removeProductRequestTemplate } from './removeProductRequestTemplate';
import { selectUserStatus } from 'redux/user/userSelectors';
import ProductsItem from '../ProductsItem';
import Button from 'shared/components/Button';
import Pagination from 'components/Products/Pagination';
import styles from './ProductsList.module.scss';
import { useSelector } from 'react-redux';
import { current } from '@reduxjs/toolkit';

export default function ProductList({ keyWord, category, sorting }) {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [currentProducts, setCurrentProducts] = useState([]);
  const [adminInCustomerMode, setAdminInCustomerMode] = useState(false);
  const [productIdsForRemoving, setProductIdsForRemoving] = useState([]);
  const [refreshProducts, setRefreshProducts] = useState(false);
  const [firstRender, setFirstRender] = useState(true); // допомагає уникати повторних запитів усіх продуктыв при першому рендері
  const userStatus = useSelector(selectUserStatus);
  const perPage = 10; // можемо зробити стейтом, якщо будемо даватиможливість обирати к-сть продуктоів на сторінці

  useEffect(() => {
    if (category.id) {
      fetchProductsByCategory(category.id);
    } else {
      fetchAllProducts();
    }

    setFirstRender(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // оновлюємо продукти (перерендерюємо список) при потребі
  useEffect(() => {
    if (firstRender) {
      return;
    }

    fetchAllProducts();
    setRefreshProducts(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshProducts]);

  useEffect(() => {
    if (firstRender) {
      return;
    }

    if (keyWord) {
      setPage(1);
      fetchProductsByKeyword(
        keyWord,
        page,
        perPage,
        sorting.field,
        sorting.order
      );
    } else if (category.id) {
      setPage(1);
      fetchProductsByCategory(
        category.id,
        page,
        perPage,
        sorting.field,
        sorting.order
      );
    } else {
      fetchAllProducts(page, perPage, sorting.field, sorting.order);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sorting]);
  // // // здійснюємо пошук за ключовим словом коли приходить новий відповідний проп
  useEffect(() => {
    if (firstRender) {
      return;
    }

    // якщо ключового слова немає - приносимо усі продукти
    if (keyWord) {
      setPage(1);
      fetchProductsByKeyword(
        keyWord,
        page,
        perPage,
        sorting.field,
        sorting.order
      );
    } else {
      setPage(1);
      fetchAllProducts(page, perPage, sorting.field, sorting.order);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyWord]);

  useEffect(() => {
    if (firstRender) {
      return;
    }

    // якщо category.id: '',то обрані всі категорії
    if (category.id) {
      fetchProductsByCategory(
        category.id,
        page,
        perPage,
        sorting.field,
        sorting.order
      );
    } else {
      fetchAllProducts(page, perPage, sorting.field, sorting.order);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  useEffect(() => {
    if (firstRender) {
      return;
    }

    if (keyWord) {
      fetchProductsByKeyword(
        keyWord,
        page,
        perPage,
        sorting.field,
        sorting.order
      );
    } else if (category.id) {
      fetchProductsByCategory(
        category.id,
        page,
        perPage,
        sorting.field,
        sorting.order
      );
    } else {
      fetchAllProducts(page, perPage, sorting.field, sorting.order);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  /////////////  services functions  //

  const fetchAllProducts = async (
    page = 1,
    perPage = 10,
    sortBy = 'createdAt',
    sortOrder = 'desc'
  ) => {
    const { products, totalPages } = await getAllProducts(
      page,
      perPage,
      sortBy,
      sortOrder
    );
    setCurrentProducts([...products]);
    setTotalPages(totalPages);
  };

  const fetchProductsByKeyword = async (
    keyWord,
    page = 1,
    perPage = 10,
    sortBy,
    sortOrder
  ) => {
    const { products, totalPages } = await getProductsByKeywords(
      keyWord,
      page,
      perPage,
      sortBy,
      sortOrder
    );
    setCurrentProducts(products);
    setTotalPages(totalPages);
  };

  const fetchProductsByCategory = async (
    categoryId,
    page = 1,
    perPage = 10,
    sortBy = 'createdAt',
    sortOrder = 'desc'
  ) => {
    const { products, totalPages } = await getProductsByCategory(
      categoryId,
      page,
      perPage,
      sortBy,
      sortOrder
    );

    setCurrentProducts(products);
    setTotalPages(totalPages);
  };

  const handleRemoveProducts = async () => {
    const body = removeProductRequestTemplate;
    body.product = productIdsForRemoving.map(id => ({ id }));
    await removeProduct(body);
    setRefreshProducts(true);
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

  const handleChangePage = pageNumber => {
    setPage(pageNumber);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (currentProducts.length < 1) {
    return <h2>Немає продуктів</h2>;
  }

  return (
    <>
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
        {currentProducts.length > 0 ? (
          <ul className={styles.list}>
            {currentProducts.map(product => (
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
      <Pagination
        page={page}
        totalPages={totalPages}
        onChangePage={handleChangePage}
      />
    </>
  );
}
