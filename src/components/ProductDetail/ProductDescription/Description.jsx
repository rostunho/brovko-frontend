
import { useLocation } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import DescriptionText from './DescriptionText';
import SharedLinkButton from '../SharedLinkButton';

import styles from './Description.module.scss';

export default function Description({
  product,
  isExpandedDescription,
  handleReadMoreClick,
}) {

  const location = useLocation();
  const isTablet = useMediaQuery({ query: '(min-width: 768px)' });
  const updatedIsExpandedDescription = isTablet || isExpandedDescription;
  

  return (
    <div className={styles.descriptionContainer}>
      {product ? (
           
        updatedIsExpandedDescription ? (
          <>
            {/* Рендерінг повного опису просто нижче */}
            <h3 style={{ marginBottom: 8 }}>Опис</h3>
            <DescriptionText
              product={product}
              isExpandedDescription={updatedIsExpandedDescription}
            />
            {isTablet ? null : (
            <SharedLinkButton
              to={location.pathname}  
              state={{ isExpandedDescription: false }} 
              label="Згорнути"
              onClick={handleReadMoreClick}
           
            />)}
          </>
        ) : (
          <>
          <h3 style={{ marginBottom: 8 }}>Опис</h3>
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
