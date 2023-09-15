import { useLocation } from 'react-router-dom';
import GoogleIcon from 'shared/icons/GoogleIcon';
import styles from './GoogleAuth.module.scss';

const GOOGLE_AUTH = process.env.REACT_APP_GOOGLE_AUTH;
console.log(GOOGLE_AUTH);

export default function GoogleAuth() {
  const { pathname } = useLocation();
  const label = labelDetection();

  function labelDetection() {
    switch (pathname) {
      case '/login':
        return 'Увійти з Google';

      case '/register':
        return 'Продовжити з Google';

      default:
        return 'Скористатись акаунтом Google';
    }
  }

  return (
    <a href={GOOGLE_AUTH} className={styles['nav-link']}>
      <GoogleIcon />
      {label}
    </a>
  );
}
