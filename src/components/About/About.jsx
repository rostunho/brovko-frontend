import React from 'react';
import BrovkoIcon from 'shared/icons/BrovkoIcon';
import Image from 'shared/components/Image';
import { smakolykData } from './smakolykData';
import { aboutTextData } from './smakolykData';

import styles from './About.module.scss';

const AboutItem = ({ imgSrc, text }) => (
  <li className={styles.aboutItem}>
    <Image src={imgSrc} className={styles.img} />
    {text}
  </li>
);

export default function About() {
  return (
    <div className={styles.about}>
      <div className={styles.icon}>
        <BrovkoIcon />
      </div>
      <p className={styles.aboutDescription}>Привіт, бро!</p>
      {aboutTextData.map((text, index) => (
        <div key={index}>
          <p className={styles.aboutText}>{text}</p>
          {index === 3 && (
            <ul>
              {smakolykData.map((item, i) => (
                <AboutItem key={i} {...item} />
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}
