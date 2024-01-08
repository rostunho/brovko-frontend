import { useState, useEffect } from 'react';
import {
  getAllProducts,
  getProductsByKeywords,
  removeProduct,
} from 'shared/services/api/brovko/products';
import { removeProductRequestTemplate } from './removeProductRequestTemplate';
import { selectUserStatus } from 'redux/user/userSelectors';
import ProductsItem from '../ProductsItem';
import Button from 'shared/components/Button';
import Pagination from 'components/Products/Pagination';
import styles from './ProductsList.module.scss';
import { useSelector } from 'react-redux';

const ProductList = ({
  keyWord,
  category,
  sorting,
  products,
  sortedProducts,
  refetchProducts,
}) => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  // const [category, setCategory] = useState(null);
  // const [sorting, setSorting] = useState('asc'); // значення "asc" || "desc"
  const [currentProducts, setCurrentProducts] = useState([]);
  const [adminInCustomerMode, setAdminInCustomerMode] = useState(false);
  const [productIdsForRemoving, setProductIdsForRemoving] = useState([]);
  const [refreshProducts, setRefreshProducts] = useState(false);
  const [firstRender, setFirstRender] = useState(true); // допомагає уникати повторних запитів усіх продуктыв при першому рендері
  const userStatus = useSelector(selectUserStatus);

  useEffect(() => {
    // if (firstRender) {
    //   fetchAllProducts();
    // }
    fetchAllProducts();
    setFirstRender(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // беремо усі продукти при першому рендері і при зміні сторінки
  useEffect(() => {
    if (firstRender) {
      return;
    }
    fetchAllProducts(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  // оновлюємо продукти (перерендерюємо список) при потребі
  useEffect(() => {
    if (firstRender) {
      return;
    }
    fetchAllProducts();
    setRefreshProducts(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshProducts]);

  // здійснюємо пошук за ключовим словом коли приходить новий відповідний проп
  useEffect(() => {
    if (firstRender) {
      return;
    }
    // якщо ключового слова немає - приносимо усі продукти
    if (keyWord === '') {
      fetchAllProducts(); // ПРОДОВЖИТИ ТУТ, зробити, як в else
      return;
    } else {
      fetchProductsByKeyword(keyWord, null, null, sorting.field, sorting.order);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyWord, sorting]);

  const fetchAllProducts = async (page = 1) => {
    const { products, totalPages } = await getAllProducts(page);
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
    // console.log('response :>> ', { products, totalPages });
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
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          marginTop: '20px',
          marginBottom: '40px',
        }}
      >
        <button onClick={() => getAllProducts()}>TEST GET ALL PRODUCTS</button>
        {/* <button onClick={() => getProductsByCategory(108)}>
          TEST GET PRODUCTS BY CATEGORY
        </button> */}
      </div>

      {/* видалити те, що вище */}

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
};

export default ProductList;
