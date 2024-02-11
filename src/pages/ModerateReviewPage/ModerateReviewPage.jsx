import { useLocation } from "react-router-dom";
import NewReviewsList from 'shared/components/NewReviewsList/NewReviewsList';
import Heading from 'shared/components/Heading';
import ModerateReviewsSwitcher from 'components/Reviews/ModerateReviewsSwitcher/ModerateReviewsSwitcher';

export default function ModerateReviewPage() {
  const location = useLocation();
  const backLinkHref = location.state?.from ?? "/";
  return (
    <>
      <Heading withGoBack fromHC={backLinkHref}>Модерувати відгуки</Heading>
      <ModerateReviewsSwitcher />
      <NewReviewsList />
    </>
  );
}
