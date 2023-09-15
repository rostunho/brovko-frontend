import { Link } from 'react-router-dom';
import DropdownArrowIcon from 'shared/icons/DropdownArrowIcon';
import styles from './ProductDetail.module.scss';

export default function ReadMoreBackButton({ to, label }) {
  return (
    <Link to={to} className={styles.readMoreLink}>
      <p className={styles.readMoreButton}>{label}</p>
      <DropdownArrowIcon
        className={`${styles.readMoreIcon} ${styles['readMoreIcon-reverse']} `}
      />
    </Link>
  );
}
