

const ErrorNotification = ({ errorCode }) => {
  let errorMessage = '';

  switch (errorCode) {
    case 401:
      errorMessage = 'Ви не авторизовані. Будь ласка, увійдіть в систему.';
      break;
    case 403:
      errorMessage = 'Ви не авторизовані. Будь ласка, увійдіть в систему.';
      break;
    case 404:
      errorMessage = 'Щось пішло не так. Будь ласка, спробуйте пізніше.';
      break;
    default:
      errorMessage = 'Виникла помилка. Будь ласка, спробуйте ще раз.';
      break;
  }

  return (
    <p style={{ color: 'red' }}>
      {errorMessage}
    </p>
  );
};

export default ErrorNotification;
