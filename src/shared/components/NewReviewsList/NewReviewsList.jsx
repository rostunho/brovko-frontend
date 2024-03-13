import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getReviewsByStatus } from 'shared/services/api/brovko';
import NewReviewItem from '../NewReviewItem/NewReviewItem';
import Pagination from 'components/Products/Pagination';
import styles from './NewReviewsList.module.scss';

export default function NewReviewsList({ style, ...props }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get('page');
  const limit = searchParams.get('limit');
  const category = searchParams.get('comments');
  const [reviews, setReviews] = useState([]);
  const [totalPages, setTotalPages] = useState(null);

  useEffect(() => {
    setSearchParams({ comments: 'new', page: 1, limit: 10 }, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!category || !page || !limit) {
      return;
    }

    (async () => {
      const { reviews, totalPages } = await getReviewsByStatus(
        category,
        page,
        limit
      );
      setReviews([...reviews]);
      setTotalPages(totalPages);
    })();
  }, [limit, page, category]);

  const setPageNumber = number => {
    setSearchParams(
      existingSearchParams => {
        existingSearchParams.set('page', number);
        return existingSearchParams;
      },
      { replace: true }
    );

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <ul style={style} className={styles.list}>
        {reviews &&
          reviews.length > 0 &&
          reviews.map((review, idx) => {
            return <NewReviewItem key={idx} review={review} />;
          })}
      </ul>
      <Pagination
        admin
        page={Number(page)}
        totalPages={totalPages}
        onChangePage={setPageNumber}
      />
    </>
  );
}
