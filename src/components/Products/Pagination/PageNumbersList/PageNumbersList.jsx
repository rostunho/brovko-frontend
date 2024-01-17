import useScreenWidth from 'shared/hooks/useScreenWidth';

import style from './PageNumbersList.module.scss';

const PageNumbersList = ({
  totalPagesArray,
  totalPages,
  page,
  handleChangePage,
}) => {
  const screenWidth = useScreenWidth();

  return (
    <>
      {screenWidth > 768
        ? totalPagesArray.length <= 5
          ? totalPagesArray.map(pageNumber => (
              <li
                key={pageNumber}
                className={`${style.pageNumber} ${
                  pageNumber === page ? style.active : ''
                }`}
                onClick={() => handleChangePage(pageNumber)}
              >
                {pageNumber}
              </li>
            ))
          : totalPagesArray.map(pageNumber => (
              <div key={pageNumber}>
                {pageNumber === 1 &&
                  pageNumber !== page &&
                  pageNumber !== page - 1 && (
                    <li
                      key={pageNumber}
                      className={style.pageNumber}
                      onClick={() => handleChangePage(pageNumber)}
                    >
                      {pageNumber}
                    </li>
                  )}
                {pageNumber === page - 2 && pageNumber !== 1 && (
                  <li
                    key={pageNumber}
                    className={style.pageNumber}
                    onClick={() => handleChangePage(pageNumber)}
                  >
                    ...
                  </li>
                )}
                {pageNumber === page - 1 && (
                  <li
                    key={pageNumber}
                    className={style.pageNumber}
                    onClick={() => handleChangePage(pageNumber)}
                  >
                    {pageNumber}
                  </li>
                )}
                {pageNumber === page && (
                  <li
                    key={pageNumber}
                    className={`${style.pageNumber} ${
                      pageNumber === page ? style.active : ''
                    }`}
                    onClick={() => handleChangePage(pageNumber)}
                  >
                    {pageNumber}
                  </li>
                )}
                {pageNumber === page + 1 && (
                  <li
                    key={pageNumber}
                    className={style.pageNumber}
                    onClick={() => handleChangePage(pageNumber)}
                  >
                    {pageNumber}
                  </li>
                )}
                {pageNumber === page + 2 && pageNumber !== totalPages && (
                  <li
                    key={pageNumber}
                    className={style.pageNumber}
                    onClick={() => handleChangePage(pageNumber)}
                  >
                    ...
                  </li>
                )}
                {pageNumber === totalPages &&
                  pageNumber !== page &&
                  pageNumber !== page + 1 && (
                    <li
                      key={pageNumber}
                      className={style.pageNumber}
                      onClick={() => handleChangePage(pageNumber)}
                    >
                      {pageNumber}
                    </li>
                  )}
              </div>
            ))
        : totalPagesArray.length <= 3
        ? totalPagesArray.map(pageNumber => (
            <li
              key={pageNumber}
              className={`${style.pageNumber} ${
                pageNumber === page ? style.active : ''
              }`}
              onClick={() => handleChangePage(pageNumber)}
            >
              {pageNumber}
            </li>
          ))
        : totalPagesArray.map(pageNumber => (
            <div key={pageNumber}>
              {pageNumber === 1 && pageNumber !== page && (
                <li
                  key={pageNumber}
                  className={style.pageNumber}
                  onClick={() => handleChangePage(pageNumber)}
                >
                  {pageNumber}
                </li>
              )}
              {pageNumber === page && (
                <li
                  key={pageNumber}
                  className={`${style.pageNumber} ${
                    pageNumber === page ? style.active : ''
                  }`}
                  onClick={() => handleChangePage(pageNumber)}
                >
                  {pageNumber}
                </li>
              )}

              {pageNumber === totalPages && pageNumber !== page && (
                <li
                  key={pageNumber}
                  className={style.pageNumber}
                  onClick={() => handleChangePage(pageNumber)}
                >
                  {pageNumber}
                </li>
              )}
            </div>
          ))}
    </>
  );
};

export default PageNumbersList;
