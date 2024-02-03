import { useReducer } from 'react';
import { addProductReducer } from 'shared/reducers/addProductReducer';
import { addProductRequestTemplate } from 'components/AddProductForm/addProductRequestTemplate';

export const useAddProductState = () => {
  const [state, dispatch] = useReducer(
    addProductReducer,
    addProductRequestTemplate()
  );

  const updateState = (event, type, data) => {
    if (Array.isArray(data)) {
      dispatch({
        type: type,
        payload: data ? [...data] : event?.target.value,
      });
    } else {
      dispatch({
        type: type,
        payload: data ? { ...data } : event?.target.value,
      });
    }
  };

  return [state, updateState];
};
