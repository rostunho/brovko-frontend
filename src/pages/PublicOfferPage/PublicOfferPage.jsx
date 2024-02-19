import { useLocation } from 'react-router-dom';
import Heading from "shared/components/Heading";
import PublicOffer from 'components/OptionalPages/PublicOffer/PublicOffer';

export default function PublicOfferPage() {

  const location = useLocation();
  const backLinkHref = location.state?.from ?? "/";

    return (
    <>
      <Heading withGoBack fromHC={backLinkHref}> ПУБЛІЧНИЙ ДОГОВІР 'ОФЕРТА'</Heading>
      <PublicOffer/>
    </>
    )
    ;
  }