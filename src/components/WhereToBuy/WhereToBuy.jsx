import { locationPoints } from './locationPoints';
import LocationIcon from 'shared/icons/LocationIcon';
import PhoneIcon from 'shared/icons/PhoneIcon';
import CalendarIcon from 'shared/icons/CalendarIcon';
import styles from './WhereToBuy.module.scss';

export default function WhereToBuy() {
  return (
    <div className={styles.container}>
  
      <ul className={styles.box}>
        {locationPoints.map(({ name, city, address, mapLink, phoneNumber, workingHours }, index) => (
          <li className={styles.link} key={index}>
            <div className={styles.card}>
              <div className={styles.icon}>
                <h3>{name}</h3>
              </div>
              <div className={styles.text}>
              <LocationIcon/>  {city} {''}
                  <a href={mapLink} target="_blank" rel="noreferrer" style={{ fontWeight: '700px', fontSize: '14px' }}>
                    {address}
                  </a>
               
                <p>
                <PhoneIcon/>
                  Телефон{' '}
                  <a href={`tel:${phoneNumber}`}>{phoneNumber}</a>
                </p>
                <p>
                <CalendarIcon style={{fill: "#F3A610"}}/>
                Години роботи:</p>
                <ul>
                  {Object.entries(workingHours).map(([day, hours]) => (
                    <li className={styles.textWorkingHours} key={day}>
                      {day.charAt(0).toUpperCase() + day.slice(1)}: {hours}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
