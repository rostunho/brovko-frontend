import { useLocation } from 'react-router-dom';
import Heading from 'shared/components/Heading';
import ExchangeAndReturn from 'components/ExchangeAndReturn/ExchangeAndReturn';

export default function ExchangeAndReturnPage() {

  const location = useLocation();
  const backLinkHref = location.state?.from ?? "/";

  return (
  <>
  <Heading withGoBack fromHC={backLinkHref}>Обмін і повернення</Heading>
    <ExchangeAndReturn />
  </>
  )
  ;
}
