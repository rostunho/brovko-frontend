import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Loader from 'components/Loader';
import Heading from 'shared/components/Heading';
import ModerateReviewsSwitcher from 'components/Reviews/ModerateReviewsSwitcher/ModerateReviewsSwitcher';

export default function ModerateReviewPage({ ...props }) {
  return (
    <>
      <Heading withGoBack>Модерувати відгуки</Heading>
      <ModerateReviewsSwitcher />
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </>
  );
}
