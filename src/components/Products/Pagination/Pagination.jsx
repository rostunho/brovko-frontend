import Button from 'shared/components/Button';
import PageNumbersList from './PageNumbersList';
import style from './Pagination.module.scss';

const Pagination = ({ page, totalPages, onChangePage }) => {
  const totalPagesArray = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handleChangePage = pageNumber => {
    onChangePage(pageNumber);
  };

  const onPrevPageClick = () => {
    if (page > 1) {
      const prevPage = Number(page) - 1;
      onChangePage(prevPage);
    }
  };

  const onNextPageClick = () => {
    if (page < totalPages) {
      const nextPage = Number(page) + 1;
      onChangePage(nextPage);
    }
  };

  return (
    <div className={style.container}>
      {totalPages && (
        <div className={style.buttons}>
          <Button
            mode="goBack"
            className={`${style.arrowPrev} ${page === 1 ? style.disabled : ''}`}
            onClick={onPrevPageClick}
          />
          <PageNumbersList
            totalPagesArray={totalPagesArray}
            totalPages={totalPages}
            page={page}
            handleChangePage={handleChangePage}
          />
          <Button
            mode="goBack"
            className={`${style.arrowNext} ${
              page === totalPages ? style.disabled : ''
            }`}
            onClick={onNextPageClick}
          />
        </div>
      )}
    </div>
  );
};

export default Pagination;
