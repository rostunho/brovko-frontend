import React from 'react';
import Rectangle from 'components/Rectangle';
import Image from 'shared/components/Image';
import Section from '../Section';
import privacyPolicyContent from './privacyPolicyContent';
import photo_4 from 'shared/images/photo_4.jpeg'
import styles from '../OptionPages.module.scss';

  function PrivacyPolicy() {
    return (
    
        <div className={styles.wrapper} >
        <Image src={photo_4} className={styles.image}/>
        
      
      <section className={styles.container}>
        {privacyPolicyContent.sections.map((section, index) => (
          <React.Fragment key={index}>
            <Section title={section.title} content={section.content} />
            {index < privacyPolicyContent.sections.length - 1 && <Rectangle />}
          </React.Fragment>
        ))}
      </section>
      </div>
      
    );
  }
  
  export default PrivacyPolicy;