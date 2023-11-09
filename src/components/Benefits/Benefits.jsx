import Image from 'shared/components/Image';
import usefulSmakolyk from 'shared/images/usefulSmakolyk.jpg';
import usefulSmakolyk2 from 'shared/images/usefulSmakolyk@2x.jpg';
import { benefitsData } from './benefitsData.js';
import { benefitsTextData } from './benefitsData.js';
import styles from './Benefits.module.scss';

export default function Benefits() {
  const BenefitItem = ({ imgSrc, text }) => (
    <li className={styles.benefitItem}>
      <Image src={imgSrc} className={styles.img} />
      {text}
    </li>
  );
  return (
    <div className={styles.benefitsContainer}>
      <div className={styles.benefitsImage}>
        <Image src={usefulSmakolyk}></Image>
      </div>

      <p className={styles.benefitsDescription}>
        Чому снеки від Бровка? Бо вони зовсім не схожі на ті, які Ваш улюбленець
        пробував досі!
      </p>

      <ul>
        {benefitsData.map((item, i) => (
          <BenefitItem key={i} {...item} />
        ))}
      </ul>
      {benefitsTextData.map((text, index) => (
        <div key={index}>
          <p className={styles.benefitsText}>{text}</p>
        </div>
      ))}
    </div>
  );
}
