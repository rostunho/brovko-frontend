
import DropdownArrowIcon from 'shared/icons/DropdownArrowIcon';
import styles from './SharedLinkButton.module.scss';

export default function ReadMoreBackButton({ onClick, label, expanded }) {
  return (
    <button className={styles.readMoreLink}onClick={onClick}>
      <p className={styles.readMoreLabel}>{label}</p>       
      <DropdownArrowIcon
        className={`${styles.readMoreIcon} ${expanded ? styles['readMoreIcon-reverse'] : ''}`}
      />

    </button>
  );
}