// import { locationPoints } from './locationPoints';
import { useEffect, useState } from 'react';
import BabayDog from 'shared/icons/BabyDog';
import Steak from 'shared/icons/Steak';
import LocationIcon from 'shared/icons/LocationIcon';
import PhoneIcon from 'shared/icons/PhoneIcon';
import CalendarIcon from 'shared/icons/Calendar2Icon';
import styles from './WhereToBuy.module.scss';

export default function WhereToBuy({locationPoints}) {
  console.log('locationPoints', locationPoints);
  const [locations, setlocations] = useState([]);
  

  return (
    <div className={styles.container}>
      <ul className={styles.box}>
        {locationPoints.map((location, index) => (
          <li className={styles.link} key={index}>
            <div className={styles.card}>
              <div className={styles.icon}>
              {/* <Steak/> */}
                <h3 style={{color: '#fefefe'}}>{location.name}</h3>
              </div>
              <div className={styles.content}>
              <p style={{height: '38px'}}>{location.fullName}</p>
             
              <div className={styles.text} style={{color: 'var(--link-color'}}>
              <LocationIcon/>  
              <a href={location.mapUrl} target="_blank" rel="noreferrer" style={{ fontWeight: '700px', fontSize: '14px' }}>
              {location.address}
              </a>
              </div>
               <div className={styles.text}>
                <PhoneIcon/>
                <ul className={styles.textWorkingHours}>
                {location.phone.map((phoneNumber, index) => (
                  <li key={index}>
                    <a href={`tel:${phoneNumber}`}>{phoneNumber}</a>
                   </li>))
                }
                </ul>
                 
                </div>
          
                <div className={styles.text}>
                <CalendarIcon style={{fill: "#F3A610"}}/>
                <ul className={styles.textWorkingHours}>
                  {Object.entries(location.workingHours).map(([day, hours]) => (
                    <li  className={styles.textWorkingHoursList}key={day}>
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
