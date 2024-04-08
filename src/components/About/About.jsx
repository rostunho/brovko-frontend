import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import useLayoutType from 'shared/hooks/useLayoutType';
import Image from 'shared/components/Image';
import frame from 'shared/images/Frame2.png';
import {
  fotoArray,
  aboutTextDataDesctop,
  aboutTextDataMobile,
} from './smakolykData';

import styles from './About.module.scss';
import Button from 'shared/components/Button';

export default function About() {
  const location = useLocation();
  const layoutType = useLayoutType();
  const isMobile = layoutType === 'mobile';

  return (
    <div className={styles.about}>
      <div className={styles['about__yellowSpot']} />
      <section className={styles['about__title']}>
        <div className={styles['about__title__box']}>
          <p style={{ marginBottom: '16px' }}>Привіт, бро!</p>
          <p className={styles['about__title__box-textItem']}>
            {aboutTextDataDesctop[0]}
          </p>
          <p className={styles['about__title__box-textItem']}>
            {aboutTextDataDesctop[1]}
          </p>
        </div>
      </section>

      <section className={styles['about__benefits']}>
        <p>{!isMobile ? aboutTextDataDesctop[2] : aboutTextDataMobile[2]}</p>
        <p>{!isMobile ? aboutTextDataDesctop[3] : aboutTextDataMobile[3]}</p>
        <Image
          src={frame}
          style={{ margin: '36px auto 16px auto', paddingRight: '16px' }}
        />
        <div className={styles['about__benefits__sinus']}></div>
      </section>

      <section className={styles['about__photos']}>
        <p>{aboutTextDataDesctop[4]}</p>
        <div className={styles['about__photos__photoBox']}>
          <div className={styles['about__photos__photoBox-item']}>
            <Image src={fotoArray[0]} />
          </div>
          <div className={styles['about__photos__photoBox-item']}>
            <p className={styles['about__photos__photoBox-text']}>
              {aboutTextDataDesctop[5]}
            </p>
            <Image src={fotoArray[1]} />
          </div>
        </div>
      </section>

      <section className={styles['about__photos']}>
        <p>{aboutTextDataDesctop[6]}</p>
        <p>{aboutTextDataDesctop[7]}</p>
        <div className={styles['about__photos__tape']}>
          {fotoArray.slice(2).map((foto, index) => (
            <Image
              key={foto.src}
              src={foto}
              className={styles['about__photos__tape-item']}
            />
          ))}
        </div>
      </section>
      <section className={styles['about__button']}>
        <NavLink
          to={
            location.pathname === '/shop/product-list-page'
              ? `${location.pathname + location.search}`
              : '/shop/product-list-page'
          }
          state={{ from: location }}
        >
          <Button className={styles['about__button__link']}>
            Зробити песика щасливим
          </Button>
        </NavLink>
        <div className={styles['about__button__arrow']}></div>
        <div className={styles['about__button__rays']}></div>
      </section>
    </div>
  );
}
