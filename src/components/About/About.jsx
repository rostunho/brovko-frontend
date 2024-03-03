import React from 'react';
import useLayoutType from 'shared/hooks/useLayoutType';
import BrovkoIcon from 'shared/icons/BrovkoIcon';
import Image from 'shared/components/Image';
import frame from 'shared/images/Frame2.png';
import GreenSinusIcon from 'shared/icons/GreenSinusIcon';
import GreenSinusMobileIcon from 'shared/icons/GreenSinusMobileIcon';
import Foto1 from 'shared/images/FotoAbout1.png';
import Foto2 from 'shared/images/FotoAbout2.png';
import Foto3 from 'shared/images/FotoAbout3.png';
import Foto4 from 'shared/images/FotoAbout4.png';
import Foto5 from 'shared/images/FotoAbout5.png';
import { aboutTextDataDesctop } from './smakolykData';

import styles from './About.module.scss';

// const AboutItem = ({ imgSrc, text }) => (
//   <li className={styles.aboutItem}>
//     <Image src={imgSrc} className={styles.img} />
//     {text}
//   </li>
// );

const MobileAbout = () => (
  <>
    <div className={styles.yellowContainerMobile}></div>
    <section>
      <div className={styles.icon}>
        <BrovkoIcon />
      </div>
      <h3>Привіт, бро!</h3>
      <div className={styles.aboutText}>
        <p className={styles.aboutText}>{aboutTextDataDesctop[0]}</p>
        <p className={styles.aboutText}>{aboutTextDataDesctop[1]}</p>
      </div>
    </section>

    <section className={styles.containerBenefits}>
      <h3 style={{ fontSize: '24px' }}>{aboutTextDataDesctop[2]}</h3>
      <h3 style={{ fontSize: '24px' }}>{aboutTextDataDesctop[3]}</h3>
      <Image src={frame} style={{ margin: '36px auto 16px auto' }} />
      <GreenSinusMobileIcon />
    </section>

    <section className={styles.containerFoto}>
      <h3 style={{ fontSize: '24px' }}>{aboutTextDataDesctop[4]}</h3>
      <div className={styles.Foto}>
        <div className={styles.fotoItem}>
          <Image src={Foto1} />
        </div>
        <div className={styles.fotoItem}>
          <p className={styles.fotoText}>{aboutTextDataDesctop[5]}</p>
          <Image src={Foto2} />
        </div>
      </div>
    </section>

    <section className={styles.containerFoto}>
      <h3>{aboutTextDataDesctop[6]}</h3>
      <h3>{aboutTextDataDesctop[7]}</h3>
      <div className={styles.FotoSlid}>
        <Image src={Foto3} className={styles.fotoItemSlid} />
        <Image src={Foto4} className={styles.fotoItemSlid} />
        <Image src={Foto5} className={styles.fotoItemSlid} />
      </div>
    </section>
  </>
);

const DesktopAbout = () => (
  <>
    <div className={styles.yellowContainer}></div>
    <section className={styles.containerTitle}>
      <div className={styles.containerText}>
        <h3>Привіт, бро!</h3>
        <p className={styles.aboutText}>{aboutTextDataDesctop[0]}</p>
        <p className={styles.aboutText}>{aboutTextDataDesctop[1]}</p>
      </div>
      <BrovkoIcon width="285" height="218" />
    </section>
    <section className={styles.containerBenefits}>
      <h3>{aboutTextDataDesctop[2]}</h3>
      <h3>{aboutTextDataDesctop[3]}</h3>
      <Image src={frame} style={{ margin: '36px auto 16px auto' }} />
      <GreenSinusIcon />
    </section>
    <section className={styles.containerFoto}>
      <h3>{aboutTextDataDesctop[4]}</h3>
      <div className={styles.Foto}>
        <div className={styles.fotoItem}>
          <Image src={Foto1} />
        </div>
        <div className={styles.fotoItem}>
          <p className={styles.fotoText}>{aboutTextDataDesctop[5]}</p>
          <Image src={Foto2} />
        </div>
      </div>
    </section>
    <section className={styles.containerFoto}>
      <h3>{aboutTextDataDesctop[6]}</h3>
      <h3>{aboutTextDataDesctop[7]}</h3>
      <div className={styles.FotoSlid}>
        <Image src={Foto3} className={styles.fotoItemSlid} />
        <Image src={Foto4} className={styles.fotoItemSlid} />
        <Image src={Foto5} className={styles.fotoItemSlid} />
      </div>
    </section>
  </>
);

export default function About() {
  const layoutType = useLayoutType();
  const isMobile = layoutType === 'mobile';

  return (
    <div className={styles.about}>
      {isMobile ? <MobileAbout /> : <DesktopAbout />}
    </div>
  );
}
