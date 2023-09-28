import { useSelector } from 'react-redux/es/hooks/useSelector';
import { selectUser } from 'redux/user/userSelectors';
import Button from 'shared/components/Button/Button';
import styles from './Navigation.module.scss';

export default function UserNav() {
  const { email } = useSelector(selectUser);
  return (
    <div className={styles.userNavWrap}>
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
