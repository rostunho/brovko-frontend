import React from 'react';
import Rectangle from 'components/Rectangle';
import Image from 'shared/components/Image';
import publicOfferContent from './publicOfferContent';
import photo_3 from 'shared/images/photo_3.jpeg'
import styles from './PublicOffer.module.scss';

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

  function PublicOffer() {
      return (
        <div className={styles.wrapper} >
        <Image src={photo_3} className={styles.image}/>

        <section className={styles.container}>
      {publicOfferContent.sections.map((section, index) => (
        <React.Fragment key={index}>
          <Section title={section.title} content={section.content} />
          {index < publicOfferContent.sections.length - 1 && <Rectangle />}
        </React.Fragment>
      ))}
    </section>
        </div>
      )
  }

  export default PublicOffer;