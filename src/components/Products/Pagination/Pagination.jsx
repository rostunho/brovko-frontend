import { useSelector } from 'react-redux';

import { selectTotalPages } from 'redux/products/productsSelectors';

import style from './Pagination.module.scss';

const Pagination = () => {
  const totalPages = useSelector(selectTotalPages);

  const totalPagesArray = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className={style.container}>
      <ul className={style.ul}>
        {totalPagesArray.map(pageNumber => (
          <li
            key={pageNumber}
            className={`${style.pageNumber} ${
              pageNumber === 1 ? style.active : ''
            }`}
            // onClick={() => handlePageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
