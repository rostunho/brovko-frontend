import { useReducer } from 'react';
import { addProductReducer } from 'shared/reducers/addProductReducer';
import { addRequestTemplate } from 'components/AddProductForm/AddRequestTemplate';

export const useAddProductState = () => {
  const [state, dispatch] = useReducer(addProductReducer, addRequestTemplate);

  const updateState = (event, type, data) => {
    dispatch({
      type: type,
      payload: data ? { ...data } : event?.target.value,
    });
  };

  return [state, updateState];
};
