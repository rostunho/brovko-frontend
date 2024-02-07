import PhoneIcon from 'shared/icons/PhoneIcon'
import MailIcon from 'shared/icons/MailIcon'
import Insta2Icon from 'shared/icons/Insta2Icon'
import FaceBookIcon from 'shared/icons/FaceBookIcon'
import styles from './Contacts.module.scss'

export default function Contacts() {
  const phoneNumber = "+38 068 135 55 95"
  return (
    <section className={styles.container}>
    <p>
      Ми будемо раді отримати відгук від вас – скористайтеся формою, щоб надіслати своє повідомлення чи ідею. Або ми радо поспілкуємося з вами та вашими хвостиками у магазинах.
    </p> 
    <div className={styles.contactsData}>
    <div className={styles.contactsDataItem}>
    <PhoneIcon />
    <a href={`tel:${phoneNumber}`}>{phoneNumber}</a>
    </div>
    <div className={styles.contactsDataItem}>
    <MailIcon/>
    <a href="mailto: brovkopet@mailinator.com" >brovkopet@mailinator.com</a>
    </div>
    </div>
    <div className={styles.contactsDataItem}></div>
    <Insta2Icon/>
    <FaceBookIcon />
    </section>
    
  )
}
