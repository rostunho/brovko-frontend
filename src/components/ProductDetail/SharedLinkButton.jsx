import { Link } from 'react-router-dom';
import DropdownArrowIcon from 'shared/icons/DropdownArrowIcon';
import styles from './ProductDetail.module.scss';

export default function SharedLinkButton({ to, state, label, onClick }) {
  console.log('stateClick', state);
  return (
    <Link
      className={styles.readMoreLink}
      to={to}
      state={state}
      onClick={onClick}
    >
      <p className={styles.readMoreButton}>{label}</p>
      <DropdownArrowIcon className={`${styles.readMoreIcon} `} />
    </Link>
  );
}
