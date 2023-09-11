import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import DropdownArrowIcon from 'shared/icons/DropdownArrowIcon';

import styles from './ProductDetail.module.scss';

export default function Description({
  product,
  isExpanded,
  location,
  handleReadMoreClick,
}) {
  return (
    <div className={styles.descriptionContainer}>
      {product ? (
        isExpanded ? (
          <Outlet />
        ) : (
          <>
            <h3 style={{ marginBottom: 8 }}>Опис</h3>
            <p className={styles.descriptionText}>
              {product.description.slice(0, 20)}
            </p>
            {!isExpanded && (
              <Link
                to={`description`}
                state={{ from: location, isExpanded: true }}
                className={styles.readMoreLink}
                onClick={handleReadMoreClick}
              >
                <p className={styles.readMoreButton}>Читати повністю</p>
                <DropdownArrowIcon className={`${styles.readMoreIcon} `} />
              </Link>
            )}
          </>
        )
      ) : (
        <p>Завантаження...</p>
      )}
    </div>
  );
}
