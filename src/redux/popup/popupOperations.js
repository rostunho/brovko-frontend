// import { useDispatch } from 'react-redux';
import { addPopUp, deletePopUp } from './popupSlice.js';

// const dispatch = useDispatch()
export const addPopupOperation = text => dispatch => {
    console.log('Adding popup:', text);
  dispatch(addPopUp( text ));

  setTimeout(() => {
    console.log('Removing popup');
    dispatch(deletePopUp());
  }, 10000);
};
