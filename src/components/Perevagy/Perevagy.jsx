import styles from './Perevagy.module.scss';
import { cardData, getIconComponent } from './cardData';

export default function Perevagy() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Чому снеки від Бровка?</h2>
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
