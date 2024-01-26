import { useDispatch } from 'react-redux';
import { addPopupOperation } from 'redux/popup/popupOperations';
import { showWarning } from 'redux/warning/warningSlice';
import CheckIcon from 'shared/icons/CheckIcon';
import Input from 'shared/components/Input';
import HeartIcon from 'shared/icons/HeartIcon';
import styles from './TestingPage.module.scss';

export default function TestingPage() {
  const dispatch = useDispatch();

  const go1 = () => {
    dispatch(addPopupOperation('', 'success'));
    // addPopupOperation('', 'success');
  };
  const go2 = () => {
    dispatch(addPopupOperation('', 'info'));
    // addPopupOperation('', 'info');
  };
  const go3 = () => {
    dispatch(addPopupOperation('', 'warning'));
    // addPopupOperation('', 'warning');
  };
  const go4 = () => {
    dispatch(addPopupOperation('', 'error'));
    // addPopupOperation('', 'error');
  };

  const openModal = () => {
    dispatch(
      showWarning(
        'Тут зараз я тобі покажу попередження, яке саме собою не зникне. Потрібно його прочитати і клацьнути "Ok"'
      )
    );
  };

  return (
    <>
      <HeartIcon className={styles.heart} />
      <HeartIcon checked className={styles.heart2} />
      {/* <CheckIcon check="#68BAEE" />
      <h1>It IS Testing Page</h1>
      <button type="button" onClick={go1}>
        Success
      </button>
      <br />
      <button type="button" onClick={go2}>
        Info
      </button>
      <br />
      <button type="button" onClick={go3}>
        Warning
      </button>
      <br />
      <button type="button" onClick={go4}>
        Error
      </button>
      <br />
      <button type="button" onClick={openModal}>
        MODAL
      </button>
      <br />
      <Input /> */}
    </>
  );
}
