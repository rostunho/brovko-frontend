import { useLocation } from 'react-router-dom';
import Heading from 'shared/components/Heading';
import SEO from 'components/SEO/SEO';
import Benefits from 'components/Benefits/Benefits';

export default function AdvantagesPage() {
  const location = useLocation();
  const backLinkHref = location.state?.from ?? '/';

  return (
    <>
      <Heading withGoBack fromHC={backLinkHref}>
        Чому це корисно?
      </Heading>
      <SEO
        title="Чому це корисно | Brovko - крамниця смаколиків для собак"
        description="Чому снеки від Бровка? Бо вони зовсім не схожі на ті, які Ваш улюбленець пробував досі! Наші палянички прекрасно доповнюють основний раціон дорослих собак. 
        Покращують здоров‘я та дарують песикам гарний настрій. 
        Снеки мають приємний аромат, легко ламаються на дрібніші шматочки, їх зручно брати з собою на щоденні прогулянки чи в далекі подорожі. 
        Виготовленні за сучасною технологією Cold Air Dry (сушіння холодним повітрям), що дозволяє зберегти в продукті всі корисні речовини. 
        Натуральні, без ароматизаторів та підсилювачів смаку."
        url="/all/advantages"
        baseUrl={process.env.REACT_APP_PUBLIC_URL}
      />
      <Benefits />
    </>
  );
}
