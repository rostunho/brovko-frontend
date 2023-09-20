export const regex = {
  email: /^[\w.-]+@[\w.-]+\.\w+$/,
  number: /^(?![\d.eE]*[eE])\d*(?:[.,]\d*)?$/,
  tel: /^\+\d{12}$/,
};

// Приймає значення і тип інтупу з якого воно отримане
// автоматично валідує відповідним патерном.
export const validateInputValue = (value, type) => {
  const regexPattern = regex[type];

  return regexPattern.test(value);
};
