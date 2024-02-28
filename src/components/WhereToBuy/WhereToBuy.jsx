import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { removeLocations } from 'shared/services/api/brovko/locations';
import AdminControlPanel from 'shared/components/AdminControlPanel/AdminControlPanel';
import Input from 'shared/components/Input';
import LocationIcon from 'shared/icons/LocationIcon';
import PhoneIcon from 'shared/icons/PhoneIcon';
import CalendarIcon from 'shared/icons/Calendar2Icon';
import styles from './WhereToBuy.module.scss';

export default function WhereToBuy({
  userStatus,
  locationPoints,
  refreshLocations,
  ...props
}) {
  const [selectedIds, setSelectedIds] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const handleAdminCheckbox = event => {
    const {
      checked,
      dataset: { id },
    } = event.target;

    if (checked) {
      setSelectedIds(prevIds => {
        if (prevIds.includes(id)) {
          return prevIds;
        } else {
          return [...prevIds, id];
        }
      });
    } else {
      setSelectedIds(prevIds => {
        return prevIds.filter(prevId => prevId !== id);
      });
    }
  };

  const handleAddLocation = () => {
    navigate('/admin/add-location', {
      state: { from: location.pathname + location.search },
    });
  };

  const handleEditLocation = () => {
    navigate(`/admin/add-location/${selectedIds[0]}`, {
      state: { from: location.pathname + location.search },
    });
  };

  const handleDeleteLocations = async () => {
    await removeLocations(selectedIds);
    refreshLocations && refreshLocations();
  };

  return (
    <>
      {(userStatus === 'superadmin' || userStatus === 'manager') && (
        <AdminControlPanel
          onAddClick={handleAddLocation}
          onEditClick={handleEditLocation}
          onDeleteClick={handleDeleteLocations}
          editDisabled={!(selectedIds.length === 1)}
          deleteDisabled={selectedIds.length < 1}
        />
      )}
      <div className={styles.container}>
        <ul className={styles.box}>
          {locationPoints.map((location, index) => (
            <li className={styles.item} key={index}>
              {(userStatus === 'superadmin' || userStatus === 'manager') && (
                <div className={styles['checkbox-backdrop']}>
                  <Input
                    type="checkbox"
                    className={styles.checkbox}
                    inputClassName={styles['checkbox-input']}
                    data-id={location._id}
                    // value={selectedIds?.includes(location._id)}
                    onChange={handleAdminCheckbox}
                  />
                </div>
              )}
              <div className={styles.card}>
                <div className={styles.icon}>
                  <h3 style={{ color: '#fefefe' }}>{location.name}</h3>
                </div>
                <div className={styles.content}>
                  <p style={{ height: '38px' }}>{location.fullName}</p>

                  <div
                    className={styles.text}
                    style={{ color: 'var(--link-color' }}
                  >
                    <LocationIcon />
                    <a
                      href={location.mapUrl}
                      target="_blank"
                      rel="noreferrer"
                      style={{ fontWeight: '700px', fontSize: '14px' }}
                    >
                      {location.address}
                    </a>
                  </div>
                  <div className={styles.text}>
                    <PhoneIcon />
                    <ul className={styles.textWorkingHours}>
                      {location.phone.map((phoneNumber, index) => (
                        <li key={index}>
                          <a href={`tel:${phoneNumber}`}>{phoneNumber}</a>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className={styles.text}>
                    <CalendarIcon style={{ fill: '#F3A610' }} />
                    <ul className={styles.textWorkingHours}>
                      {Object.entries(location.workingHours).map(
                        ([day, hours]) => (
                          <li className={styles.textWorkingHoursList} key={day}>
                            {day.charAt(0).toUpperCase() + day.slice(1)}:{' '}
                            {hours}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
