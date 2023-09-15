import { useSelector } from 'react-redux';

import Button from 'shared/components/Button';

import { selectTotalPages } from 'redux/products/productsSelectors';

import style from './Pagination.module.scss';

const Pagination = ({ page, onChangePage }) => {
  const totalPages = useSelector(selectTotalPages);

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
      <ul className={style.ul}>
        <Button
          mode="goBack"
          className={`${style.arrowPrev} ${page === 1 ? style.disabled : ''}`}
          onClick={onPrevPageClick}
        />

        {totalPagesArray.map(pageNumber => (
          <li
            key={pageNumber}
            className={`${style.pageNumber} ${
              pageNumber === page ? style.active : ''
            }`}
            onClick={() => handleChangePage(pageNumber)}
          >
            {pageNumber}
          </li>
        ))}

        <Button
          mode="goBack"
          className={`${style.arrowNext} ${page === 2 ? style.disabled : ''}`}
          onClick={onNextPageClick}
        />
      </ul>
    </div>
  );
};

export default Pagination;
