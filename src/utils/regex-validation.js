export const regex = {
  email: /^[\w.-]+@[\w.-]+\.\w+$/,
  number: /^(?![\d.eE]*[eE])\d*(?:[.,]\d*)?$/,
  tel: /^\+\d{2} \(\d{3}\) \d{3} \d{4}$/,
  password: /.*/,
  url: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/,
};

// Приймає значення і тип інтупу з якого воно отримане
// автоматично валідує відповідним патерном.
export const validateInputValue = (value, type) => {
  const regexPattern = regex[type];

  return regexPattern.test(value);
};
