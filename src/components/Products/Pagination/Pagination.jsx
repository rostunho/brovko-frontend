import { useSelector } from 'react-redux';

import Button from 'shared/components/Button';
import PageNumbersList from './PageNumbersList';

import { selectTotalPages } from 'redux/products/productsSelectors';

import style from './Pagination.module.scss';

const Pagination = ({ page, onChangePage }) => {
  const totalPages = useSelector(selectTotalPages);
  console.log(totalPages);
  // const totalPages = 90;

  const totalPagesArray = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handleChangePage = pageNumber => {
    onChangePage(pageNumber);
  };

  const onPrevPageClick = () => {
    if (page > 1) {
      const prevPage = page - 1;
      onChangePage(prevPage);
    }
  };

  const onNextPageClick = () => {
    if (page < totalPages) {
      const nextPage = page + 1;
      onChangePage(nextPage);
    }
  };

  return (
    <div className={style.container}>
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
    </div>
  );
};

export default Pagination;
