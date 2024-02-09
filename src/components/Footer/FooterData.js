import styles from './Footer.module.scss';
import InstaIcon from 'shared/icons/InstaIcon';
import ViberIcon from 'shared/icons/ViberIcon';
import FaceBook2Icon from 'shared/icons/FaceBook2';
import TelegramIcon from 'shared/icons/TelegramIcon';
import VisaIcon from 'shared/icons/VisaIcon';
import MasterCardIcon from 'shared/icons/MasterCardIcon';

export const aboutUsLinks = [
  { url: '/all/about', label: 'Про Бровка' },
  { url: '/all/perevagy', label: 'Чому це корисно' },
  { url: '/all/contacts', label: 'Контакти' },
];

export const supportLinks = [
  { url: '/all/payment-and-delivery', label: 'Оплата та доставка' },
  { url: '/all/exchange-and-return', label: 'Обмін і повернення' },
];

export const supportFullLinks = [
  { url: '/all/payment-and-delivery', label: 'Оплата та доставка' },
  { url: '/all/exchange-and-return', label: 'Обмін і повернення' },
  { url: '/all/privacy-policy', label: 'Політика конфіденційності' },
  { url: '/all/public-offer', label: 'Договір публічної оферти' },
];

export const companyLinks = [
  { url: '/shop/product-list-page', label: 'Крамничка' },
  { url: '/shop/actions', label: 'Акції' },
];

export const socialIconsData = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/brovko.pet/',
    icon: <InstaIcon className={styles.icon} />,
  },
  // {
  //   label: 'Viber',
  //   href: 'viber://chat?number=+380681355595',
  //   icon: <ViberIcon className={styles.icon} />,
  // },
  {
    label: 'FaceBook',
    href: 'https://www.facebook.com/profile.php?id=100089139919993',
    icon: <FaceBook2Icon className={styles.icon} />,
  },
  {
    label: 'Telegram',
    href: 'https://t.me/brovko_pet',
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
