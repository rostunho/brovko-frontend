import { useReducer, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { selectIsLogin } from 'redux/user/userSelectors';
import Input from 'shared/components/Input';
import styles from './CustomerForm.module.scss';

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_FIRST-NAME':
      return { ...state, firstName: action.payload };

    case 'ADD_MIDDLE-NAME':
      return { ...state, middleName: action.payload };

    case 'ADD_LAST-NAME':
      return { ...state, lastName: action.payload };

    case 'ADD_PHONE':
      return { ...state, phone: action.payload };

    case 'ADD_EMAIL':
      return { ...state, email: action.payload };

    default:
      return '';
  }
}

export default function CustomerForm({ user, userIsLoggedIn, getData }) {
  const initialState = {
    firstName: user?.firstName || '',
    middleName: user.middleName || '',
    lastName: user?.lastName || '',
    phone: user?.phone || '',
    email: user.email || '',
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  // console.log('user in CustomerForm:>> ', user);
  // console.log('userIsLoggedIn in CustomerForm :>> ', userIsLoggedIn);

  useEffect(() => {
    getData({ ...state });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const handleOnChange = (event, type, data) => {
    dispatch({
      type: type,
      payload: event.target.value,
    });
  };

  return (
    <div className={`${styles.form} ${userIsLoggedIn ? styles.logged : ''}`}>
      <Input
        name="lastName"
        label="Прізвище*"
        value={state.lastName}
        placeholder="Введіть своє прізвище"
        onChange={e => handleOnChange(e, 'ADD_LAST-NAME')}
      />
      <Input
        name="firstName"
        label={`${"Ім'я*"}`}
        value={state.firstName}
        placeholder={`Введіть своє ${"ім'я"}`}
        onChange={e => handleOnChange(e, 'ADD_FIRST-NAME')}
      />
      <Input
        name="middleName"
        label="По-батькові"
        value={state.middleName}
        placeholder="Введіть своє по-батькові"
        onChange={e => handleOnChange(e, 'ADD_MIDDLE-NAME')}
      />
      <Input
        name="phone"
        type="tel"
        label="Телефон*"
        value={state.phone}
        onChange={e => handleOnChange(e, 'ADD_PHONE')}
      />
      <Input
        name="email"
        type="email"
        label="E-mail*"
        value={state.email}
        placeholder="Введіть свій E-mail"
        onChange={e => handleOnChange(e, 'ADD_EMAIL')}
      />
    </div>
  );
}
