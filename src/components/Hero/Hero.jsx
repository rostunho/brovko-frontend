// import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from 'shared/components/Button';
import styles from './Hero.module.scss';

// import heroMob1x from '../../shared/images/heroLight.jpg';
// import heroMob2x from '../../shared/images/heroLight2.jpg';

const Hero = () => {
  const location = useLocation();

  // const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  // useEffect(() => {
  //   function handleResize() {
  //     setScreenWidth(window.innerWidth);
  //   }
  //   window.addEventListener('resize', handleResize);
  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //   };
  // }, []);

  //   const getImage = () => {
  //     if (screenWidth < 768 && window.devicePixelRatio === 1) {
  //       return heroMob1x;
  //     } else if (screenWidth < 768 && window.devicePixelRatio === 2) {
  //       return heroMob2x;
  //     } else if (screenWidth < 768) {
  //       return heroMob2x;
  //     } else if (
  //       screenWidth >= 768 &&
  //       screenWidth < 1280 &&
  //       window.devicePixelRatio === 1
  //     ) {
  //       return heroTab1x;
  //     } else if (
  //       screenWidth >= 768 &&
  //       screenWidth < 1280 &&
  //       window.devicePixelRatio === 2
  //     ) {
  //       return heroTab2x;
  //     } else if (screenWidth >= 768 && screenWidth < 1280) {
  //       return heroTab2x;
  //     } else if (window.devicePixelRatio === 1) {
  //       return heroDes1x;
  //     } else if (window.devicePixelRatio === 2) {
  //       return heroDes2x;
  //     } else {
  //       return heroDes2x;
  //     }
  //   };

  // const getImage = () => {
  //   return heroMob1x;
  // if (screenWidth < 768 && window.devicePixelRatio === 1) {
  //   return heroMob1x;
  // } else if (screenWidth < 768 && window.devicePixelRatio === 2) {
  //   return heroMob2x;
  // } else if (screenWidth < 768) {
  //   return heroMob2x;
  // }
  // };

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.container}>
          <h1 className={styles.title}>ЯК ДЛЯ ЛЮДЕЙ, ТІЛЬКИ СМАЧНІШЕ</h1>
          <Link
            to="/shop/product-list-page"
            // state={{ from: location.state?.from } || '/'}
            state={{ from: location }}
          >
            <Button>Перейти до смаколиків</Button>
          </Link>
        </div>
      </section>
    </>
  );
};

export default Hero;
