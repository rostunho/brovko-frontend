import { useLocation } from 'react-router-dom';
import Heading from 'shared/components/Heading';
import Contacts from 'components/Contacts/Contacts';
import SEO from 'components/SEO/SEO';

export default function ContactsPage() {
  const location = useLocation();
  const backLinkHref = location.state?.from ?? '/';

  return (
    <>
      <Heading withGoBack fromHC={backLinkHref}>
        Контакти
      </Heading>
      <SEO
        title="Контакти | Зворотній зв'язок | Brovko"
        description="Ми будемо раді отримати відгук від вас – скористайтеся формою, щоб надіслати своє повідомлення чи ідею. Або ми радо поспілкуємося з вами та вашими хвостиками у магазинах."
        url="/all/contacts"
              />
      <Contacts />
    </>
  );
}
