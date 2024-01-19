import { useState } from 'react';
import { useDispatch } from 'react-redux';

import Button from 'shared/components/Button';

import StatusOptions from './StatusOptions';
import ListByStatus from '../ListByStatus';

import { getAllByStatus } from 'shared/services/api/brovko/user';
import Loader from 'components/Loader';

import { addPopupOperation } from 'redux/popup/popupOperations';

import styles from './StatusSection.module.scss';

const StatusSection = () => {
  const [showStatus, setShowStatus] = useState('');
  const [list, setList] = useState([]);
  const [nobodyExist, setNobodyExist] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const toggleStatusToShow = data => {
    setNobodyExist(false);
    setShowStatus(data);
  };

  const onShowStatusList = async () => {
    setLoading(true);
    try {
      const data = await getAllByStatus(showStatus);
      dispatch(addPopupOperation('Декого таки знайшли'));
      setList(data.users);
    } catch (error) {
      if (error.response.status === 404) {
        setList([]);
        dispatch(addPopupOperation('Немає нікого з таким статусом', 'error'));
        setNobodyExist(true);
      }
    }
    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <StatusOptions toggleStatusToShow={toggleStatusToShow} />
      <Button onClick={onShowStatusList} className={styles.buttonShow}>
        Показати список
      </Button>
      {loading && <Loader />}
      {list.length > 0 && <ListByStatus list={list} />}
      {nobodyExist && <p>Ця роль ще ніким не зайнята!</p>}
    </div>
  );
};

export default StatusSection;
