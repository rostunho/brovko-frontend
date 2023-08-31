import { Link } from 'react-router-dom';
import { useState } from 'react';
import FooterItem from './FooterItem';
import styles from './Footer.module.scss';
import ArrowDownIcon from 'shared/icons/ArrowDownIcon';
import InstaIcon from 'shared/icons/InstaIcon';
import ViberIcon from 'shared/icons/ViberIcon';
import TelegramIcon from 'shared/icons/TelegramIcon';
import VisaIcon from 'shared/icons/VisaIcon';
import MasterCardIcon from 'shared/icons/MasterCardIcon';
import Rectangle from 'components/Rectangle/Rectangle';

export default function Footer({ onClick }) {
  const [openedSection, setOpenedSection] = useState(null);
  const toggleSection = sectionLabel => {
    setOpenedSection(prevSection =>
      prevSection === sectionLabel ? null : sectionLabel
    );
  };
  const aboutUsLinks = [
    { url: '/about', label: 'Про Бровка' },
    { url: '/perevagy', label: 'Чому це корисно' },
    { url: '/contacts', label: 'Контакти' },
  ];

  const supportLinks = [
    { url: '/shipping-and-payments', label: 'Оплата та доставка' },
    { url: '/exchange-and-return', label: 'Обмін і повернення' },
  ];

  const companyLinks = [
    { url: '/product-list-page', label: 'Крамничка' },
    { url: '/actions', label: 'Акції' },
  ];

  const openInstagram = () => {
    window.open('https://www.instagram.com/brovko.pet/', '_blank');
  };

  const openTelegram = () => {
    window.open('https://t.me/brovko_telegram_account', '_blank');
  };

  const openViber = () => {
    window.open('viber://chat?number=+380685072222', '_blank');
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerLinks}>
          <FooterItem
            links={aboutUsLinks}
            icon={<ArrowDownIcon />}
            label="Про нас"
            isOpen={openedSection === 'Про нас'}
            onToggle={toggleSection}
          />
          <FooterItem
            links={supportLinks}
            icon={<ArrowDownIcon />}
            label="Допомога"
            isOpen={openedSection === 'Допомога'}
            onToggle={toggleSection}
          />
          <FooterItem
            links={companyLinks}
            icon={<ArrowDownIcon />}
            label="Для вас"
            isOpen={openedSection === 'Для вас'}
            onToggle={toggleSection}
          />
        </div>

        <div className={styles.footerBox}>
          <a href="tel:+380685072222" className={styles.link}>
            +38 (068) 507 22 22
          </a>
          <div className={styles.footerIconsContainers}>
            <div className={styles.socialIcons}>
              <button className={styles.iconButton} onClick={openInstagram}>
                <InstaIcon className={styles.icon} />
              </button>
              <button className={styles.iconButton} onClick={openViber}>
                <ViberIcon className={styles.icon} />
              </button>
              <button className={styles.iconButton} onClick={openTelegram}>
                <TelegramIcon className={styles.icon} />
              </button>
            </div>
            <div className={styles.bankIcons}>
              <button className={styles.iconButton} onClick={openTelegram}>
                <VisaIcon className={styles.icon} />{' '}
              </button>
              <button className={styles.iconButton} onClick={openTelegram}>
                <MasterCardIcon className={styles.icon} />
              </button>
            </div>
          </div>
        </div>
      </div>
      <Rectangle />

      <p className={styles.copy}>Copyright 2023 &copy; Бровко</p>
    </footer>
  );
}
