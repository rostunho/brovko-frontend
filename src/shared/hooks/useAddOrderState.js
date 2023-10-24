import { useReducer } from 'react';
import { addOrderReducer } from 'shared/reducers/addOrderReducer';
import { addOrderRequestTemplate } from 'components/OrderForm/addOrderRequestTemplate';

export const useAddOrderState = () => {
  const [state, dispatch] = useReducer(
    addOrderReducer,
    addOrderRequestTemplate
  );

  const updateState = (event, type, data) => {
    dispatch({
      type: type,
      payload: data ? { ...data } : event?.target.value,
    });
  };

  return [state, updateState];
};
