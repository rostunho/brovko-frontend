import Image from 'shared/components/Image'
import photo_2 from 'shared/images/photo_2.jpeg'
import paymentAndDeliveryContent from './paymentAndDeliveryContent';
import Section from '../Sections';
import Rectangle from 'components/Rectangle';
import styles from '../OptionalPages.module.scss'



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