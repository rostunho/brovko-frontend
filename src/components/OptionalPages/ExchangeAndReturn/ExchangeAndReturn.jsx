import React from 'react';
import Rectangle from 'components/Rectangle';
import Image from 'shared/components/Image';
import Section from '../Section';
import exchangeAndReturnContent from './exchangeAndReturnContent';
import photo_1 from 'shared/images/photo_1.jpeg'
import styles from '../OptionPages.module.scss'


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