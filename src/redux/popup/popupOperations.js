import { addPopUp, deletePopUp } from './popupSlice.js';

export const addPopupOperation = (text, type) => dispatch => {
  dispatch(addPopUp({ text, type }));

  setTimeout(() => {
    dispatch(deletePopUp());
  }, 10000);
};
