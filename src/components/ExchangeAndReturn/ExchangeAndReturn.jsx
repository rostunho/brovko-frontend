import React from 'react';
import Rectangle from 'components/Rectangle';
import Image from 'shared/components/Image';
import exchangeAndReturnContent from './exchangeAndReturnContent';
import photo_2 from 'shared/images/photo_2.jpeg'
import photo_1 from 'shared/images/photo_1.jpeg'
import styles from './ExchangeAndReturn.module.scss';

function Section({ title, content }) {
  return (
    <section className={styles.section}>
      <h3 className={styles.title}>{title}</h3>
      <div>
        {content.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}

function ExchangeAndReturn() {
  return (
  
      <div className={styles.wrapper} >
      <Image src={photo_1} className={styles.image}/>
      
    
    <section className={styles.container}>
      {exchangeAndReturnContent.sections.map((section, index) => (
        <React.Fragment key={index}>
          <Section title={section.title} content={section.content} />
          {index < exchangeAndReturnContent.sections.length - 1 && <Rectangle />}
        </React.Fragment>
      ))}
    </section>
    </div>
    
  );
}

export default ExchangeAndReturn;