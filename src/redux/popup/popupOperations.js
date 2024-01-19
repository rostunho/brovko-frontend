import { customAlphabet } from 'nanoid';
import { addPopUp, deletePopUp } from './popupSlice.js';

export const addPopupOperation = (text, type) => dispatch => {
  const nanoid = customAlphabet('1234567890', 4);
  const id = nanoid();

  dispatch(addPopUp({ id, text, type }));

  const autoDelete = () => {
    dispatch(deletePopUp(id));
  };

  setTimeout(autoDelete, 10000);
};
