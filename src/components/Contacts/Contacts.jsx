import { Link } from 'react-router-dom';
import Button from 'shared/components/Button';
import Image from 'shared/components/Image';
import useLayoutType from 'shared/hooks/useLayoutType';
import FotoIcon from 'shared/icons/Foto';
import PhoneIcon from 'shared/icons/PhoneIcon';
import MailIcon from 'shared/icons/MailIcon';
import Insta2Icon from 'shared/icons/Insta2Icon';
import FaceBookIcon from 'shared/icons/FaceBookIcon';
import Telegramm2Icon from 'shared/icons/Telegramm2Icon';
import FeedbackForm from './FeedbackForm';
import styles from './Contacts.module.scss';

const socialIconsData = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/brovko.pet/',
    icon: <Insta2Icon className={styles.icon} />,
  },
  {
    label: 'FaceBook',
    href: 'https://www.facebook.com/profile.php?id=100089139919993',
    icon: <FaceBookIcon className={styles.icon} />,
  },
  {
    label: 'Telegram',
    href: 'https://t.me/brovko_pet',
    icon: <Telegramm2Icon className={styles.icon} />,
  },
];

const phoneNumber = '+38 068 135 55 95';
const emailAddress = 'brovkopet@mailinator.com';

const Contacts = () => {

  const layoutType = useLayoutType();

  const isMobile = layoutType === 'mobile';
  const isTablet = layoutType === 'tablet';
  const isDesktop = layoutType === 'desktop';

  return (
    <>
    <section className={styles.container}>
    <div className={styles.contactsFrame}>
    <p className={styles.text}>
      Замовлення приймає Галина - ваша помічниця в інтернет-крамничці.
      </p> 

      <div className={styles.contactsData}>
      <div className={styles.contactDataBox}>
      <div className={styles.foto}>
      <Image
      //  src='/slides/taste_5.jpg'
       alt='ваша помічниця в інтернет-крамничці'
      />
      </div>
      
      <ul className={styles.contactList}>
          <li className={styles.contactsDataItem}>
            <Link className={styles.icon} to={`tel:${phoneNumber}`}>
              <PhoneIcon  style={{ marginLeft: '-3px' }} />
            </Link>
            <Link className={styles.iconLink} to={`tel:${phoneNumber}`}>{phoneNumber}</Link>
          </li>
          <li className={styles.contactsDataItem}>
            <Link className={styles.icon} to={`mailto:${emailAddress}`}>
              <MailIcon style={{ paddingTop: '5px' }} />
            </Link>
            <Link className={styles.iconLink} to={`mailto:${emailAddress}`}>{emailAddress}</Link>
          </li>
        </ul>
      </div>
        
        <ul className={styles.socialIconList}>
          {socialIconsData.map(({ label, href, icon }) => (
            <li key={label} className={styles.socialIconItem}>
              <a href={href} target="_blank" rel="noreferrer" className={styles.icon}>
                {icon}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {!isMobile ? <p style={{paddingBottom: '24px'}}>Ми будемо раді отримати відгук від вас – скористайтеся формою, щоб надіслати своє повідомлення чи ідею. Або ми радо поспілкуємося з вами та вашими хвостиками у магазинах.</p> : ""}
      
      <Link to="/all/where-to-buy">
        <Button mode="outlined" size="lg">Знайти магазин поблизу</Button>
      </Link>
    </div>
     

      <div className={styles.contactsFrame}>
        <p className={styles.text} style={{fontWeight: '700'}}>Маєте запитання або зауваження?<br />Скористайтеся формою, щоб зв'язатися з нами.
        </p>
        <FeedbackForm/>
   </div>
    </section>
    </>
  );
}

export default Contacts;
