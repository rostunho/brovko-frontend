export const regex = {
  email: /^[\w.-]+@[\w.-]+\.\w+$/,
  number: /^(?![\d.eE]*[eE])\d*(?:[.,]\d*)?$/,
  tel: /^\+\d{2} \(\d{3}\) \d{3} \d{4}$/,
  password:
    // eslint-disable-next-line no-useless-escape
    /^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/,
  url: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/,
  radio: /.*/,
  checkbox: /.*/,
};

// Приймає значення і тип інтупу з якого воно отримане
// автоматично валідує відповідним патерном.
export const validateInputValue = (value, type) => {
  const regexPattern = regex[type];

  return regexPattern.test(value);
};
