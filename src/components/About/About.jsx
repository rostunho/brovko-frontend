import React from 'react';
import useLayoutType from 'shared/hooks/useLayoutType';
import Image from 'shared/components/Image';
import frame from 'shared/images/Frame2.png';
import {
  fotoArray,
  aboutTextDataDesctop,
  aboutTextDataMobile,
} from './smakolykData';

import styles from './About.module.scss';

export default function About() {
  const layoutType = useLayoutType();
  const isMobile = layoutType === 'mobile';

  return (
    <div className={styles.about}>
      <div className={styles.yellowContainer} />
      <section className={styles.containerTitle}>
        <div className={styles.containerTitleText}>
          <p className={styles.titleText} style={{ marginBottom: '16px' }}>
            Привіт, бро!
          </p>
          <p className={styles.itemTitleText}>{aboutTextDataDesctop[0]}</p>
          <p className={styles.itemTitleText}>{aboutTextDataDesctop[1]}</p>
        </div>
      </section>

      <section className={styles.containerBenefits}>
        <p className={styles.titleText}>
          {!isMobile ? aboutTextDataDesctop[2] : aboutTextDataMobile[2]}
        </p>
        <p className={styles.titleText}>
          {!isMobile ? aboutTextDataDesctop[3] : aboutTextDataMobile[3]}
        </p>
        <Image src={frame} style={{ margin: '36px auto 16px auto' }} />
        <div className={styles.sinus}></div>
      </section>

      <section className={styles.containerFoto}>
        <p className={styles.titleText}>{aboutTextDataDesctop[4]}</p>
        <div className={styles.Foto}>
          <div className={styles.fotoItem}>
            <Image src={fotoArray[0]} />
          </div>
          <div className={styles.fotoItem}>
            <p className={styles.fotoText}>{aboutTextDataDesctop[5]}</p>
            <Image src={fotoArray[1]} />
          </div>
        </div>
      </section>

      <section className={styles.containerFoto}>
        <p className={styles.titleText}>{aboutTextDataDesctop[6]}</p>
        <p className={styles.titleText}>{aboutTextDataDesctop[7]}</p>
        <div className={styles.FotoSlid}>
          {fotoArray.slice(2).map((foto, index) => (
            <Image key={foto.src} src={foto} className={styles.fotoItemSlid} />
          ))}
        </div>
      </section>
    </div>
  );
}
