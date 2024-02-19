import React from 'react';
import Rectangle from 'components/Rectangle';
import Image from 'shared/components/Image';
import privacyPolicyContent from './privacyPolicyContent';
import Section from '../Sections';
import photo_4 from 'shared/images/photo_4.jpeg'
import photo_1 from 'shared/images/photo_1.jpeg'
import styles from '../OptionalPages.module.scss';

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