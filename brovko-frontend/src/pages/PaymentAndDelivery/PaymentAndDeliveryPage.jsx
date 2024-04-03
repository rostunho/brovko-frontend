import { useLocation } from 'react-router-dom';
import Heading from 'shared/components/Heading';
import PaymentAndDelivery from 'components/OptionalPages/PaymentAndDelivery/PaymentAndDelivery';
import SEO from 'components/SEO/SEO';
export default function PaymentAndDeliveryPage() {
  const location = useLocation();
  const backLinkHref = location.state?.from ?? '/';

  return (
    <>
      <Heading withGoBack={backLinkHref}>Оплата та доставка</Heading>
      <SEO
        title="Оплата | Доставка | Brovko"
        description="Доставка. Ціна. Способи оплати."
        url="all/payment-and-delivery"
      />
      <PaymentAndDelivery />
    </>
  );
}
