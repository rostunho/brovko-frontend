import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';
import VisaIcon from 'shared/icons/VisaIcon';
import MasterCardIcon from 'shared/icons/MasterCardIcon';
import Rectangle from 'components/Rectangle/Rectangle';

export default function Footer({ onClick }) {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerLinks}>
          <ul className={styles.linksList}>
            <li>
              <Link to="/main" className={styles.link}>
                Головна
              </Link>
            </li>
            <li>
              <Link to="/about" className={styles.link}>
                Про нас
              </Link>
            </li>
            <li>
              <Link to="/where-to-buy" className={styles.link}>
                Де придбати
              </Link>
            </li>
            <li>
              <Link to="/contacts" className={styles.link}>
                Контакти
              </Link>
            </li>
            <li>
              <a href="tel:+380685072222" className={styles.link}>
                Телефон: +38 (068) 507 22 22
              </a>
            </li>
          </ul>
        </div>

        <div className={styles.footerBox}>
          <ul className={styles.linksList}>
            <li>
              <Link to="/publichna-oferta" className={styles.link}>
                Публічна оферта
              </Link>
            </li>
            <li>
              <Link to="/shipping-and-payments" className={styles.link}>
                Оплата та доставка
              </Link>
            </li>
            <li className={styles.item} onClick={onClick}>
              <Link className={styles.link} to="/where-to-buy">
                Обмін та повернення
              </Link>
            </li>
          </ul>
          <div className={styles.footerIcons}>
            <VisaIcon />
            <MasterCardIcon />
          </div>
        </div>
      </div>
      <Rectangle />

      <p className={styles.copy}>Copyright 2023 &copy; Бровко</p>
    </footer>
  );
}
