/* eslint-disable jsx-a11y/anchor-is-valid */
import Image from 'shared/components/Image';
import styles from './NotFound.module.scss';
import Text from 'shared/components/Text/Text';
import { useEffect, useState } from 'react';
import ProductList from 'components/Products/ProductsList/ProductsList';
import { getAllCategories, getAllProducts } from 'shared/services/api';
import { useSearchParams } from 'react-router-dom';
import images404 from './img';

export default function NotFound() {
  // eslint-disable-next-line no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();

  const keyWord = searchParams.get('key');
  const categoryId = searchParams.get('id');
  const sortingBy = searchParams.get('by');
  const sortingOrder = searchParams.get('order');
  const priceMin = searchParams.get('min');
  const priceMax = searchParams.get('max');
  const limit = searchParams.get('limit');
  const [products, setProducts] = useState([]);

  const ramdomFilterProducts = (products, quontityProducts) => {
    if (!products) {
      return [];
    }
    const ramdomItems = [];
    for (let i = 0; i < quontityProducts; i++) {
      let indexRandomItem = Math.floor(Math.random() * products.length);
      if (!ramdomItems.includes(products[indexRandomItem])) {
        ramdomItems.push(products[indexRandomItem]);
      }
    }
    return ramdomItems;
  };

  // eslint-disable-next-line no-unused-vars
  const [currentCategories, setCurrentCategories] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [countPage, setCountPage] = useState(0);
  const [firstRender, setFirstRender] = useState(true);
  const page = searchParams.get(countPage);

  const fetchProducts = async (page = 1, limit) => {
    (async () => {
      try {
        const response = await getAllProducts({
          search: keyWord,
          categoryId: categoryId,
          sortBy: sortingBy,
          sortOrder: sortingOrder,
          priceMin: priceMin,
          priceMax: priceMax,
          page: page ? Number(page) : 1,
          perPage: limit ? Number(limit) : 1000,
        });
        setProducts(response);
      } catch (error) {
        console.log('Не отримано продуктів', error);
      }
    })();
  };

  const [image, setImage] = useState();

  const fetchCategories = async () => {
    try {
      const { categories } = await getAllCategories();
      setCurrentCategories([...categories]);
      return categories;
    } catch (error) {
      console.log('Не отримано категорій', error);
    }
  };

  const generateRamdomImage = () => {
    if (
      images404 === undefined ||
      images404 == null ||
      !Array.isArray(images404) ||
      images404.length
    ) {
      const ramdomIndex = Math.floor(Math.random() * images404.length);
      const ramdomImage = images404[ramdomIndex];
      if (image !== ramdomImage) {
        setImage(ramdomImage);
      } else {
        generateRamdomImage();
      }
    } else {
      return;
    }
  };

  useEffect(() => {
    generateRamdomImage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (firstRender) {
      (async () => {
        await fetchCategories();
        await fetchProducts(Number(page), Number(limit));
        // при першому рендері page=null i limit=null, тому функція викличеться без них. Зате при прямому вставленні урли - спрацюють;
        // initialProcessing(searchParams);setFirstRender(false);
      })();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    } else {
      setFirstRender(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const handleClick = e => {
    e.preventDefault();
    generateRamdomImage();
  };
  return (
    <>
      <div className={styles.wrapper}>
        <p className={styles.textTop}>4</p>
        <div className={styles.spinWrapper}>
          <a
            href="#"
            aria-label="Кнопка обертаючогося смаколика"
            className={styles.randomLink}
            onClick={e => handleClick(e)}
          >
            <Image src={image} className={styles.spinning} />
          </a>
        </div>
        <p className={styles.textBottom}>4</p>
      </div>
      <Text className={styles.message}>Улюблений смаколик не знайдено🤔</Text>
      <Text className={styles.message}>
        Тицьни смаколик-крутелик, і отримай інший
      </Text>
      <ProductList products={ramdomFilterProducts(products.products, 4)} />{' '}
    </>
  );
}
