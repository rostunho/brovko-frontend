import { useReducer } from 'react';
import { addProductReducer } from 'shared/reducers/addProductReducer';
import { addProductRequestTemplate } from 'components/AddProductForm/addProductRequestTemplate';

export const useAddProductState = () => {
  const [state, dispatch] = useReducer(
    addProductReducer,
    addProductRequestTemplate
  );

  const updateState = (event, type, data) => {
    dispatch({
      type: type,
      payload: data ? { ...data } : event?.target.value,
    });
  };

  return [state, updateState];
};
