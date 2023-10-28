import Heading from '../Heading';
import DropdownArrowIcon from 'shared/icons/DropdownArrowIcon';
import styles from './UserDataHeading.module.scss';

export default function UserDataHeading({ opened, children, ...props }) {
  return (
    <div
      {...props}
      className={`${styles.heading} ${opened ? styles['showed-info'] : ''}`}
    >
      <Heading type="h3">{children}</Heading>
      <DropdownArrowIcon className={styles['heading-icon']} />
    </div>
  );
}
