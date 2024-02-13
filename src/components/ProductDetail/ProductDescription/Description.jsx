import { useState} from 'react';
import useLayoutType from 'shared/hooks/useLayoutType';
import DescriptionText from './DescriptionText';
import ReadMoreButton from '../ProductDetailButtons/ReadMoreBackButton';

import styles from './Description.module.scss';


export default function Description({
  product
}) {
  const [expanded, setExpanded] = useState(false);

  const toggleDescription = () => {
    setExpanded(prevExpanded => !prevExpanded);
  };
 
  const layoutType = useLayoutType();
  const isMobile = layoutType ==='mobile';

  const updatedIsExpandedDescription = !isMobile || expanded;
  
  return (
    <div className={styles.descriptionContainer}>
      {product ? (
           
       expanded ? (
          <>
            {/* Рендерінг повного опису*/}
            <h3 style={{ marginBottom: 8 }}>Опис</h3>
            <DescriptionText
              product={product}
              expanded={updatedIsExpandedDescription}
            />
            {isMobile ? (
            <ReadMoreButton
              label="Згорнути"
              onClick={toggleDescription}
              expanded={updatedIsExpandedDescription}
           
            />) : null }
          </>
        ) : (
          <>
          <h3 style={{ marginBottom: 8 }}>Опис</h3>
            <DescriptionText
              product={product}
              expanded={updatedIsExpandedDescription}
            />
            {isMobile && (
              <ReadMoreButton
                label="Читати повністю"
                onClick={toggleDescription}
                expanded={updatedIsExpandedDescription}
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
