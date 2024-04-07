
import { Link, useLocation } from 'react-router-dom';
import Button from 'shared/components/Button';
import styles from './Hero.module.scss';


const Hero = () => {
  const location = useLocation();

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.container}>
          <h1 className={styles.title}>
            ЯК ДЛЯ ЛЮДЕЙ, <br />
            ТІЛЬКИ СМАЧНІШЕ
          </h1>
          <Link
            to="/shop/product-list-page"
            // state={{ from: location.state?.from } || '/'}
            state={{ from: location }}
          >
            <Button style={{ height: '50px' }}>Перейти до смаколиків</Button>
          </Link>
        </div>
      </section>
    </>
  );
};

export default Hero;
