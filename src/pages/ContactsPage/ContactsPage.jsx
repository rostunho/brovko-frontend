import { useLocation } from "react-router-dom";
import Heading from 'shared/components/Heading';
import Contacts from 'components/Contacts/Contacts';



export default function ContactsPage() {
  const location = useLocation();
  const backLinkHref = location.state?.from ?? "/";

  return (
    <>
       <Heading withGoBack fromHC={backLinkHref}>Контакти</Heading>
  <Contacts />
    </>
  )
 
}
