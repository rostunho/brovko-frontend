import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addPopupOperation } from 'redux/popup/popupOperations';
import Input from 'shared/components/Input';

export default function TestingPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addPopupOperation('RANDOM TEXT'));
  });

  return (
    <>
      <h1>It IS Testing Page</h1>

      <Input />
    </>
  );
}
