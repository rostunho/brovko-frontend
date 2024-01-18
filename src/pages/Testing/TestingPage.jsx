import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addPopupOperation } from 'redux/popup/popupOperations';
import Input from 'shared/components/Input';

export default function TestingPage() {
  const dispatch = useDispatch();

  const go1 = () => {
    dispatch(addPopupOperation('', 'success'));
  };
  const go2 = () => {
    dispatch(addPopupOperation('', 'info'));
  };
  const go3 = () => {
    dispatch(addPopupOperation('', 'warning'));
  };
  const go4 = () => {
    dispatch(addPopupOperation('', 'error'));
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
      <Input />
    </>
  );
}
