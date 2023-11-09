import largestCities from './largestCities';
import styles from './HotOptions.module.scss';

export default function HotOptions({ onClick, ...props }) {
  let i = 0;

  return (
    <ul className={styles.list}>
      {largestCities.map(option => {
        return (
          <li className={styles.item} key={i++} onClick={() => onClick(option)}>
            <p>{option.MainDescription}</p>
          </li>
        );
      })}
    </ul>
  );
}
