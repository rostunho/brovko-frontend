import {useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';
import useLayoutType from 'shared/hooks/useLayoutType';
import DescriptionText from './DescriptionText';
import SharedLinkButton from '../ProductDetailButtons/SharedLinkButton';

import styles from './Description.module.scss';


export default function Description({
  product,
  isExpandedDescription,
  handleReadMoreClick,
}) {

  const location = useLocation();
 
  const layoutType = useLayoutType();

  const isMobile = layoutType ==='mobile';
  const isTablet = layoutType === 'tablet';
  const isDesktop = layoutType === 'desktop';

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
