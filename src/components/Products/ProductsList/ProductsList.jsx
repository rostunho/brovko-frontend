import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';

import { Link } from 'react-router-dom';

import { getAllProducts } from 'redux/products/productsSelectors';
import { fetchAllProducts } from 'redux/products/productsOperations';

import ProductsItem from '../ProductsItem';
import SearchBar from 'shared/components/SearchBar/SearchBar';
import Filter from 'components/Filter/Filter';

import styles from './ProductsList.module.scss';

const ProductList = () => {
  const products = useSelector(getAllProducts);
  console.log('products:', products);

  // Стан для пошуку та фільтрації
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSortingOption, setSelectedSortingOption] = useState(null);

  // обробкa події відправки форми
  const handleSearchSubmit = formData => {
    setSearchTerm(formData.search); // Оновити стан пошуку
  };

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

  // сортування
  let sortedProducts = [...filteredProducts]; //копія масиву

  if (selectedSortingOption) {
    if (selectedSortingOption === 'Від дешевих до дорогих') {
      sortedProducts.sort((a, b) => {
        // console.log('a.price:', a.price, 'b.price:', b.price);
        return a.price - b.price;
      });
    } else if (selectedSortingOption === 'Від дорогих до дешевих') {
      sortedProducts.sort((a, b) => {
        // console.log('a.price:', a.price, 'b.price:', b.price);
        return b.price - a.price;
      });
    } else if (selectedSortingOption === 'За рейтингом') {
      sortedProducts.sort((a, b) => {
        // console.log('a.rating:', a.rating, 'b.rating:', b.rating);
        return b.rating - a.rating;
      });
    } else if (selectedSortingOption === 'Новинки') {
      sortedProducts.sort((a, b) => {
        // console.log('a.createdAt:', a.createdAt, 'b.createdAt:', b.createdAt);
        // return b.createdAt.localeCompare(a.createdAt);
      });
    }
  }

  return (
    <div className={styles.products}>
      <SearchBar onSubmit={handleSearchSubmit} />
      <Filter
        onCategorySelect={category => setSelectedCategory(category)}
        onSortingSelect={option => setSelectedSortingOption(option)}
      />

      {sortedProducts.length > 0 ? (
        <ul className={styles.list}>
          {sortedProducts.map(product => (
            <li key={product._id}>
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
