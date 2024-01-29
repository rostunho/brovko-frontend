import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getReviewsByStatus } from 'shared/services/api/brovko';

import NewReviewsList from 'shared/components/NewReviewsList/NewReviewsList';
import Heading from 'shared/components/Heading';
import ModerateReviewsSwitcher from 'components/Reviews/ModerateReviewsSwitcher/ModerateReviewsSwitcher';

export default function ModerateReviewPage({ ...props }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    setSearchParams({ comments: 'new' });
    (async () => {
      const newReviews = await getReviewsByStatus();
      console.log('newReviews :>> ', newReviews);
      setReviews([...newReviews.data]);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const category = searchParams.get('comments');

    (async () => {
      const updatedReviews = await getReviewsByStatus(category);
      setReviews([...updatedReviews.data]);
    })();
  }, [searchParams]);

  const changeCommentsCategory = category => {
    setSearchParams({ comments: category });
  };

  return (
    <>
      <Heading withGoBack>Модерувати відгуки</Heading>
      <ModerateReviewsSwitcher
        onNewClick={() => changeCommentsCategory('new')}
        onApprovedClick={() => changeCommentsCategory('approved')}
        onRejectedClick={() => changeCommentsCategory('rejected')}
      />
      <NewReviewsList reviews={reviews} />
    </>
  );
}
