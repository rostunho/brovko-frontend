import { useSelector } from 'react-redux/es/hooks/useSelector';
import { selectUser } from 'redux/user/userSelectors';
import Button from 'shared/components/Button/Button';
import styles from './UserNav.module.scss';

export default function UserNav() {
  const { email } = useSelector(selectUser);
  return (
    <div className={styles.wrap}>
      {email}
      <Button
        mode="outlined"
        style={{ padding: 5, margin: 5, minWidth: 60, height: 20, border: 0 }}
      >
        Вийти
      </Button>
    </div>
  );
}
