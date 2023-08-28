import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getAllProducts } from 'redux/products/productsSelectors';
import { fetchAllProducts } from 'redux/products/productsOperations';

import ProductsItem from '../ProductsItem';
import Heading from 'shared/components/Heading/Heading';
import SearchBar from 'shared/components/SearchBar/SearchBar';
import Filter from 'components/Filter/Filter';

import styles from './ProductsList.module.scss';

const ProductList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  const { products } = useSelector(getAllProducts);
  // console.log(products);

  // Стан для пошуку та фільтрації
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);

  // обробкa події відправки форми
  const handleSearchSubmit = formData => {
    setSearchTerm(formData.search); // Оновити стан пошуку
    console.log('Form data submitted:', formData);
  };

  // Фільтруємо продукти за пошуковим терміном
  // const filteredProducts = searchTerm
  //   ? products.filter(product =>
  //       product.name.toLowerCase().includes(searchTerm.toLowerCase())
  //     )
  //   : products;

  if (!products) {
    return null;
  }
  // Фільтруємо продукти за пошуковим терміном та обраною категорією
  const filteredProducts = products.filter(product => {
    const nameMatch =
      !searchTerm ||
      product.name.toLowerCase().includes(searchTerm.toLowerCase());

    if (!selectedCategory) {
      return nameMatch;
    }

    const categoryMatch = product.categoryId.includes(selectedCategory);

    return nameMatch && categoryMatch;
  });

  console.log(filteredProducts);

  return (
    <div className={styles.products}>
      <Heading withGoBack>Крамничка</Heading>
      <SearchBar onSubmit={handleSearchSubmit} />
      <Filter onCategorySelect={category => setSelectedCategory(category)} />

      {filteredProducts.length > 0 ? (
        <ul className={styles.list}>
          {filteredProducts.map(product => (
            <li key={product.id}>
              <ProductsItem product={product} />
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
