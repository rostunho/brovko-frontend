import { useLocation } from "react-router-dom";
import Heading from "shared/components/Heading"
import PaymentAndDelivery from "components/OptionalPages/PaymentAndDelivery/PaymentAndDelivery"

export default function PaymentAndDeliveryPage () {

    const location = useLocation();
    const backLinkHref = location.state?.from ?? "/";
    
    return (
        <>
            <Heading withGoBack={backLinkHref}>Оплата та доставка</Heading>
            <PaymentAndDelivery/>
        
        </>
    )
}