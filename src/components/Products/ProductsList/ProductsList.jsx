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

export default function ProductList({
  searchValue,
  category,
  sorting,
  refresh = false,
}) {
  const [keyWord, setKeyWord] = useState(searchValue || '');
  const [categoryId, setCategoryId] = useState(category?.id || '');
  const [sort, setSort] = useState(
    { ...sorting } || {
      name: 'Сортування',
      order: 'desc',
      field: 'createdAt',
    }
  );
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [currentProducts, setCurrentProducts] = useState([]);
  const [adminInCustomerMode, setAdminInCustomerMode] = useState(false);
  const [productIdsForRemoving, setProductIdsForRemoving] = useState([]);
  const [refreshProducts, setRefreshProducts] = useState(refresh);
  const [firstRender, setFirstRender] = useState(true); // допомагає уникати повторних запитів усіх продуктыв при першому рендері
  const userStatus = useSelector(selectUserStatus);
  const perPage = 10; // можемо зробити стейтом, якщо будемо даватиможливість обирати к-сть продуктоів на сторінці

  console.log('categoryId on front of Component', { categoryId });

  useEffect(() => {
    console.log('categoryId into starting useEfect', { categoryId });
    // працює при прямому пейсті урли в нове вікно браузера
    if (categoryId) {
      fetchProductsByCategory(
        categoryId,
        page,
        perPage,
        sort.field,
        sort.order
      );
    }

    if (categoryId === 'all') {
      fetchAllProducts(page, perPage, sort.field, sort.order);
    }
    setFirstRender(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setKeyWord(searchValue);
  }, [searchValue]);

  useEffect(() => {
    setCategoryId(category.id);
  }, [category.id]);

  useEffect(() => {
    setSort({ ...sorting });
  }, [sorting]);

  // для того щоб оновити список, якщо клікнути по кнопці порожнього серчбару при вибраній категорії
  useEffect(() => {
    setRefreshProducts(refresh);
  }, [refresh]);

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
    if (firstRender || !keyWord) {
      return;
    }

    if (keyWord) {
      setPage(1);
      fetchProductsByKeyword(keyWord, 1, perPage, sort.field, sort.order);
    } else if (categoryId) {
      setPage(1);
      fetchProductsByCategory(categoryId, 1, perPage, sort.field, sort.order);
    } else if (!keyWord && categoryId === 'all') {
      setPage(1);
      fetchAllProducts(1, perPage, sort.field, sort.order);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyWord]);

  useEffect(() => {
    if (firstRender || !categoryId) {
      return;
    }

    if (keyWord) {
      setPage(1);
      fetchProductsByKeyword(keyWord, page, perPage, sort.field, sort.order);
    } else if (categoryId) {
      setPage(1);
      fetchProductsByCategory(categoryId, 1, perPage, sort.field, sort.order);
    } else if (!keyWord && categoryId === 'all') {
      setPage(1);
      fetchAllProducts(1, perPage, sort.field, sort.order);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId]);

  useEffect(() => {
    if (firstRender || sort.name === 'Сортування') {
      return;
    }
    keyWord &&
      fetchProductsByKeyword(keyWord, page, perPage, sort.field, sort.order);
    categoryId &&
      fetchProductsByCategory(
        categoryId,
        page,
        perPage,
        sort.field,
        sort.order
      );
    !keyWord &&
      categoryId === 'all' &&
      fetchAllProducts(page, perPage, sort.field, sort.order);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort]);

  useEffect(() => {
    if (firstRender) {
      return;
    }

    keyWord &&
      fetchProductsByKeyword(keyWord, page, perPage, sort.field, sort.order);
    categoryId &&
      fetchProductsByCategory(
        categoryId,
        page,
        perPage,
        sort.field,
        sort.order
      );
    !keyWord &&
      categoryId === 'all' &&
      fetchAllProducts(page, perPage, sort.field, sort.order);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  /////////////  services functions  //

  const fetchAllProducts = async (
    page = 1,
    perPage = 10,
    sortBy = 'createdAt',
    sortOrder = 'desc'
  ) => {
    console.log('FETCH ALL PRODUCTS STARTED');

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
    sortBy = 'createdAt',
    sortOrder = 'desc'
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
    if (categoryId === 'all') {
      return;
    }

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
