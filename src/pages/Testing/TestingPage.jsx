import { useDispatch } from 'react-redux';
import { addPopupOperation } from 'redux/popup/popupOperations';
import { showWarning } from 'redux/warning/warningSlice';
import Input from 'shared/components/Input';

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
      <Input />
    </>
  );
}
