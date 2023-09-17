import { Outlet } from 'react-router-dom';
import DescriptionHeader from './DescriptionHeader';
import DescriptionText from './DescriptionText';
import SharedLinkButton from '../SharedLinkButton';

import styles from '../ProductDetail.module.scss';

export default function Description({
  product,
  isExpandedDescription,
  handleReadMoreClick,
}) {
  return (
    <div className={styles.descriptionContainer}>
      {product ? (
        isExpandedDescription ? (
          <>
            <Outlet />
          </>
        ) : (
          <>
            <DescriptionHeader />
            <DescriptionText
              product={product}
              isExpandedDescription={isExpandedDescription}
            />
            {!isExpandedDescription && (
              <SharedLinkButton
                to={`description`}
                state={{
                  from: '/product-list-page',
                  isExpandedDescription: true,
                }}
                label="Читати повністю"
                onClick={handleReadMoreClick}
              />
            )}
          </>
        )
      ) : (
        <p>Завантаження...</p>
      )}
    </div>
  );
}
