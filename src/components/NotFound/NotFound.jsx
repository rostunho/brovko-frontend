import Image from 'shared/components/Image';
import styles from './NotFound.module.scss';
import smakolyk1 from './img/1.png';
import smakolyk2 from './img/2.png';
import smakolyk3 from './img/3.png';
import smakolyk4 from './img/4.png';
import smakolyk5 from './img/5.png';
import smakolyk6 from './img/6.png';
import Text from 'shared/components/Text/Text';
import { useEffect, useState } from 'react';
import ProductList from 'components/Products/ProductsList/ProductsList';
import { getAllCategories, getAllProducts } from 'shared/services/api';
import { useSearchParams } from 'react-router-dom';
// import { getAllProducts } from 'redux/products/productsSelectors';

export default function NotFound() {
  const images = [
    smakolyk1,
    smakolyk2,
    smakolyk3,
    smakolyk4,
    smakolyk5,
    smakolyk6,
  ];
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
      // console.log('no products');
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

  const [currentCategories, setCurrentCategories] = useState([]);
  const [countPage, setCountPage] = useState(0);
  const [firstRender, setFirstRender] = useState(true);
  const page = searchParams.get(countPage);
  // const [page, setPage] = useState(0);

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
      image === undefined ||
      image == null ||
      !Array.isArray(image) ||
      images.length
    ) {
      const ramdomIndex = Math.floor(Math.random() * images.length);
      const ramdomImage = images[ramdomIndex];
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
            href=""
            className={styles.randomLink}
            onClick={e => handleClick(e)}
          >
            <Image src={image} className={styles.spinning} />
          </a>
        </div>
        <p className={styles.textBottom}>4</p>
      </div>
      <Text className={styles.message}>Смаколик не знайдено🤔</Text>
      <Text className={styles.message}>
        Клікни на обертаючийся смаколик, щоб отримати інший
      </Text>
      {<ProductList products={ramdomFilterProducts(products.products, 4)} />}
    </>
  );
}
