import { addPopUp, deletePopUp } from './popupSlice.js';

 export const addPopupOperation = text => dispatch => {
  dispatch(addPopUp( text ));

  setTimeout(() => {
    dispatch(deletePopUp());
  }, 10000);
};

