import { useState, useEffect } from 'react';
import Text from 'shared/components/Text/Text';
import Button from 'shared/components/Button';
import styles from './CookiesBanner.module.scss';

const CookieConsentBanner = () => {
  const [cookieConsent, setCookieConsent] = useState(false);

  useEffect(() => {
    const userHasConsented = localStorage.getItem('cookieConsent');
    // console.log(userHasConsented);
    if (userHasConsented) {
      setCookieConsent(true);
    }
  }, []);

  const handleConsent = () => {
    setCookieConsent(true);
    localStorage.setItem('cookieConsent', 'true');
  };

  if (!cookieConsent) {
    return (
      <div className={styles.cookiesBanner}>
        <div className={styles.container}>
          <Text className={styles.bannerText}>
            Ми використовуємо файлы cookie, бо без них буде не дуже.
            Залишаючисьі на сайті, ви погоджуєтеся з нашою{' '}
            <a className={styles.privacyLink} href="/all/privacy-policy">
              Політикою конфіденційності.
            </a>
          </Text>
          <Button
            className={styles['agree-button']}
            size="md"
            onClick={handleConsent}
          >
            Прийняти
          </Button>
        </div>
      </div>
    );
  }

  return null; // Ні відображати, якщо вже погодився
};

export default CookieConsentBanner;
