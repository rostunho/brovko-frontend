import { useLocation } from 'react-router-dom';
import Heading from "shared/components/Heading";
import PrivacyPolicy from "components/Optional Pages/PrivacyPolicy/PrivacyPolicy";

export default function PrivacyPolicyPage() {
  const location = useLocation();
  const backLinkHref = location.state?.from ?? "/";
    return (
      <>
      <Heading withGoBack fromHC={backLinkHref}>Політика конфіденційності
      </Heading>
      <PrivacyPolicy/>
      </>
    );
  }