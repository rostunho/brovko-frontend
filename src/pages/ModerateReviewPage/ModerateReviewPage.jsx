import NewReviewsList from 'shared/components/NewReviewsList/NewReviewsList';
import Heading from 'shared/components/Heading';
import ModerateReviewsSwitcher from 'components/Reviews/ModerateReviewsSwitcher/ModerateReviewsSwitcher';

export default function ModerateReviewPage() {
  return (
    <>
      <Heading withGoBack>Модерувати відгуки</Heading>
      <ModerateReviewsSwitcher />
      <NewReviewsList />
    </>
  );
}
