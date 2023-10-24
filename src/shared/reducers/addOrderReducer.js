import { addOrderRequestTemplate } from 'components/OrderForm/addOrderRequestTemplate';

export const addOrderReducer = (state, action) => {
  const { type, payload } = action;
  const newState = { ...state };

  switch (type) {
    default:
      return addOrderRequestTemplate;
  }
};
