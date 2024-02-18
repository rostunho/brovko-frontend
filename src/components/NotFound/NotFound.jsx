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
      console.log('no products');
      return [];
    }
    const ramdomItems = [];
    console.log(products, 'products', quontityProducts, 'qty');
    for (let i = 0; i < quontityProducts; i++) {
      let indexRandomItem = Math.floor(Math.random() * products.length);
      ramdomItems.push(products[indexRandomItem]);
      console.log('ramdomItems', ramdomItems);
    }
    // setRamProd(ramdomItems)
    return ramdomItems;
  };

  const [currentCategories, setCurrentCategories] = useState([]);
  const [ramProd, setRamProd] = useState(
    [])
  const [countPage, setCountPage] = useState(0);
  console.log(countPage);
  const [firstRender, setFirstRender] = useState(true);
  const page = searchParams.get(countPage);
  // const [page, setPage] = useState(0);

  console.log('products', products);
  const fetchProducts = async (page, limit) => {
    (async () => {
      try {
        const response = await getAllProducts({
          search: keyWord,
          categoryId: categoryId,
          sortBy: sortingBy,
          sortOrder: sortingOrder,
          priceMin: priceMin,
          priceMax: priceMax,
          page: countPage ? Number(countPage) : 1,
          perPage: limit ? Number(limit) : 500,
        });
        setProducts(response);
      } catch (error) {
        console.log('Не отримано продуктів', error);
      }
    })();
  };

  const [image, setImage] = useState();
  console.log();

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
        setRamProd(ramdomFilterProducts(products.products, 4));
        console.log('image', image, 'ramprod', ramProd);
      } else {
        generateRamdomImage();
      }
    } else {
      return;
    }
  };

  useEffect(() => {
    generateRamdomImage();
    // setRamProd(ramdomFilterProducts(products.products, 4));
  }, []);

  useEffect(() => {
    if (firstRender) {
      (async () => {
        await fetchCategories();
        await fetchProducts(Number(page), Number(limit));
        // generateRamdomImage();
        // setRamProd(ramdomFilterProducts(products.products, 4)); // при першому рендері page=null i limit=null, тому функція викличеться без них. Зате при прямому вставленні урли - спрацюють;
        // initialProcessing(searchParams);setFirstRender(false);
      })();
      // generateRamdomImage();
      // setRamProd(ramdomFilterProducts(products.products, 4));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    } else {
      setFirstRender(false);
    }
  }, [searchParams]);

  const handleClick = e => {
    e.preventDefault();
    generateRamdomImage();
    // setRamProd(ramdomFilterProducts(products.products, 4));
  };
  console.log(ramProd);
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
      {ramProd.length > 0 && <ProductList products={ramProd} />}
    </>
  );
}
