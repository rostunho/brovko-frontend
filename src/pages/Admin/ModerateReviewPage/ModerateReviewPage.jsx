import { useLocation } from 'react-router-dom';
import NewReviewsList from 'shared/components/NewReviewsList/NewReviewsList';
import Heading from 'shared/components/Heading';
import ModerateReviewsSwitcher from 'components/Reviews/ModerateReviewsSwitcher/ModerateReviewsSwitcher';
import SEO from 'components/SEO/SEO';

export default function ModerateReviewPage() {
  const location = useLocation();
  const backLinkHref = location.state?.from ?? '/';
  return (
    <>
      <Heading withGoBack fromHC={backLinkHref}>
        Модерувати відгуки
      </Heading>
      <SEO
        title="Профіль адміна | Модерувати відгуки | Brovko"
        description="Профіль адміна | Brovko - магазин корисних смаколиків для песиків"
        url="/admin/moderate-reviews"
      />
      <ModerateReviewsSwitcher />
      <NewReviewsList style={{ marginTop: '16px' }} />
    </>
  );
}
