import Image from 'shared/components/Image'
import photo_2 from 'shared/images/photo_2.jpeg'
import paymentAndDeliveryContent from './paymentAndDeliveryContent';
import Rectangle from 'components/Rectangle';
import styles from './PaymentAndDelivery.module.scss'

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

function PaymentAndDelivery () {
    return(
        <div className={styles.wrapper} >
      <Image src={photo_2} className={styles.image}/>

      <section className={styles.container}>
      {paymentAndDeliveryContent.sections.map((section, index) => (
        <div key={index}>
          <Section title={section.title} content={section.content} />
          {index < paymentAndDeliveryContent.sections.length - 1 && <Rectangle />}
        </div>
      ))}
    </section>

        </div>
    )
}

export default PaymentAndDelivery;