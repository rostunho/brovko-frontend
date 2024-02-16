import React from 'react';
import Rectangle from 'components/Rectangle';
import Image from 'shared/components/Image';
import privacyPolicyContent from './privacyPolicyContent';
import photo_4 from 'shared/images/photo_4.jpeg'
import photo_1 from 'shared/images/photo_1.jpeg'
import styles from './PrivacyPolicy.module.scss';

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