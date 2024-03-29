import styles from './Advantages.module.scss';
import { cardData, getIconComponent } from './cardData';
import Heading from 'shared/components/Heading';

export default function Advantages() {
  return (
    <div className={styles.container}>
      <Heading>Чому снеки від Бровка?</Heading>
      <ul className={styles.box}>
        {cardData.map((card, index) => (
          <li className={styles.link} key={index}>
            <div className={styles.card}>
              <div className={styles.icon}>{getIconComponent(card.icon)}</div>
              <div className={styles.text}>{card.text}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
