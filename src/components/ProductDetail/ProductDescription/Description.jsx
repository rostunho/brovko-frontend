import { Outlet } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import DescriptionHeader from './DescriptionHeader';
import DescriptionText from './DescriptionText';
import SharedLinkButton from '../SharedLinkButton';

import styles from '../ProductDetail.module.scss';

export default function Description({
  product,
  isExpandedDescription,
  handleReadMoreClick,
}) {
  const location = useLocation();
  return (
    <div className={styles.descriptionContainer}>
      {product ? (
        isExpandedDescription ? (
          <>
            {/* Рендерінг повного опису просто нижче */}
            <DescriptionHeader />
            <DescriptionText
              product={product}
              isExpandedDescription={isExpandedDescription}
            />
            <SharedLinkButton
              to={location.pathname}  
              state={{ isExpandedDescription: false }} 
              label="Згорнути"
              onClick={handleReadMoreClick}
            />
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
               to={location.pathname}
                state={{ isExpandedDescription: true }}
                // state={{
                //   from: location.state.from,
                //   isExpandedDescription: true,
                // }}
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
