import { useState } from 'react';

import Button from 'shared/components/Button';

import StatusOptions from './StatusOptions';
import ListByStatus from '../ListByStatus';

import { getAllByStatus } from 'shared/services/api/brovko/user';

import styles from './StatusSection.module.scss';

const StatusSection = () => {
  const [showStatus, setShowStatus] = useState('');
  const [list, setList] = useState([]);
  const [nobodyExist, setNobodyExist] = useState(false);

  const toggleStatusToShow = data => {
    setNobodyExist(false);
    setShowStatus(data);
  };

  const onShowStatusList = async () => {
    try {
      const data = await getAllByStatus(showStatus);
      setList(data.users);
    } catch (error) {
      if (error.response.status === 404) {
        setList([]);
        setNobodyExist(true);
      }
    }
  };

  return (
    <div className={styles.container}>
      <StatusOptions toggleStatusToShow={toggleStatusToShow} />
      <Button onClick={onShowStatusList} className={styles.buttonShow}>
        Показати список
      </Button>
      {list.length > 0 && <ListByStatus list={list} />}
      {nobodyExist && <p>Ця роль ще ніким не зайнята!</p>}
    </div>
  );
};

export default StatusSection;
