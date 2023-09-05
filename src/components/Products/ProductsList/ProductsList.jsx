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
  console.log('products:', products);

  // Стан для пошуку та фільтрації
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSortingOption, setSelectedSortingOption] = useState(null);

  // обробкa події відправки форми
  const handleSearchSubmit = formData => {
    // console.log('handleSearchSubmit is called');
    setSearchTerm(formData.search); // Оновити стан пошуку
    // console.log('Form data submitted:', formData);
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

  // console.log('filteredProducts', filteredProducts);

  // сортування
  let sortedProducts = [...filteredProducts]; //копія масиву
  // console.log('sortedProducts1', sortedProducts);
  // console.log('selectedSortingOption', selectedSortingOption);

  if (selectedSortingOption) {
    if (selectedSortingOption === 'Від дешевих до дорогих') {
      sortedProducts.sort((a, b) => {
        console.log('a.price:', a.price, 'b.price:', b.price);
        return a.price - b.price;
      });
    } else if (selectedSortingOption === 'Від дорогих до дешевих') {
      sortedProducts.sort((a, b) => {
        console.log('a.price:', a.price, 'b.price:', b.price);
        return b.price - a.price;
      });
    } else if (selectedSortingOption === 'За рейтингом') {
      sortedProducts.sort((a, b) => {
        console.log('a.rating:', a.rating, 'b.rating:', b.rating);
        return b.rating - a.rating;
      });
    } else if (selectedSortingOption === 'Новинки') {
      sortedProducts.sort((a, b) => {
        console.log('a.createdAt:', a.createdAt, 'b.createdAt:', b.createdAt);
        // return b.createdAt.localeCompare(a.createdAt);
      });
    }
  }

  // console.log('sortedProducts', sortedProducts);

  return (
    <div className={styles.products}>
      <Heading withGoBack>Крамничка</Heading>
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
