import { locationPoints } from './locationPoints';
import BabayDog from 'shared/icons/BabyDog';
import Steak from 'shared/icons/Steak';
import LocationIcon from 'shared/icons/LocationIcon';
import PhoneIcon from 'shared/icons/PhoneIcon';
import CalendarIcon from 'shared/icons/CalendarIcon';
import styles from './WhereToBuy.module.scss';

export default function WhereToBuy() {
  return (
    <div className={styles.container}>
      <ul className={styles.box}>
        {locationPoints.map(({ name, foolName, city, address, mapLink, phoneNumber, alternatePhoneNumber, workingHours }, index) => (
          <li className={styles.link} key={index}>
            <div className={styles.card}>
              <div className={styles.icon}>
              <Steak/>
                <h3 style={{color: '#fefefe'}}>{name}</h3>
              </div>
              <div className={styles.content}>
              <div className={styles.text}>{foolName}</div>
              <div className={styles.text}>
              <LocationIcon/>  
              {city} {''}
              <a href={mapLink} target="_blank" rel="noreferrer" style={{ fontWeight: '700px', fontSize: '14px' }}>
              {address}
              </a>
               </div>
               <div className={styles.text}>
                <PhoneIcon/>
                  <a href={`tel:${phoneNumber}`}>{phoneNumber}</a>
                </div>
                {alternatePhoneNumber ? <div className={styles.text}>
                <PhoneIcon fill={"rgba(0, 0, 0, 0)"}/>
                  <a href={`tel:${alternatePhoneNumber}`}>{alternatePhoneNumber}</a>
                </div> : ''}
                <div className={styles.text}>
                <CalendarIcon style={{fill: "#F3A610"}}/>
                <ul className={styles.textWorkingHours}>
                  {Object.entries(workingHours).map(([day, hours]) => (
                    <li  key={day}>
                      {day.charAt(0).toUpperCase() + day.slice(1)}: {hours}
                    </li>
                  ))}
                </ul>
              </div>
              </div>
              
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
