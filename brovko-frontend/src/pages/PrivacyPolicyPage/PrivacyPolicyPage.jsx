import { useLocation } from 'react-router-dom';
import Heading from 'shared/components/Heading';
import PrivacyPolicy from 'components/OptionalPages/PrivacyPolicy/PrivacyPolicy';
import SEO from 'components/SEO/SEO';

export default function PrivacyPolicyPage() {
  const location = useLocation();
  const backLinkHref = location.state?.from ?? '/';
  return (
    <>
      <Heading withGoBack fromHC={backLinkHref}>
        Політика конфіденційності
      </Heading>
      <SEO
        title="Політика конфіденційності | Brovko"
        description="Політика конфіденційності.Збір і використання персональної інформації. Видалення профілю. Інформування клієнтів. Контакти"
        url="/all/privacy-policy"
      />
      <PrivacyPolicy />
    </>
  );
}
