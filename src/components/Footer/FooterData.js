import styles from './Footer.module.scss';
import InstaIcon from 'shared/icons/InstaIcon';
import ViberIcon from 'shared/icons/ViberIcon';
import TelegramIcon from 'shared/icons/TelegramIcon';
import VisaIcon from 'shared/icons/VisaIcon';
import MasterCardIcon from 'shared/icons/MasterCardIcon';

export const aboutUsLinks = [
  { url: '/about', label: 'Про Бровка' },
  { url: '/perevagy', label: 'Чому це корисно' },
  { url: '/contacts', label: 'Контакти' },
];

export const supportLinks = [
  { url: '/shipping-and-payments', label: 'Оплата та доставка' },
  { url: '/exchange-and-return', label: 'Обмін і повернення' },
];

export const companyLinks = [
  { url: '/product-list-page', label: 'Крамничка' },
  { url: '/actions', label: 'Акції' },
];

export const socialIconsData = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/brovko.pet/',
    icon: <InstaIcon className={styles.icon} />,
  },
  {
    label: 'Viber',
    href: 'viber://chat?number=+380685072222',
    icon: <ViberIcon className={styles.icon} />,
  },
  {
    label: 'Telegram',
    href: 'https://t.me/brovko_telegram_account',
    icon: <TelegramIcon className={styles.icon} />,
  },
];

export const bankIconsData = [
  {
    label: 'Visa',
    href: 'https://brovko-visa-link.com',
    icon: <VisaIcon className={styles.icon} />,
  },
  {
    label: 'MasterCard',
    href: 'https://brovko-mastercard-link.com',
    icon: <MasterCardIcon className={styles.icon} />,
  },
];
