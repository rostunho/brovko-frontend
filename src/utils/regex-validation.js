export const regex = {
  email: /^[\w.-]+@[\w.-]+\.\w+$/,
};

// Приймає значення і тип інтупу з якого воно отримане
// автоматично валідує відповідним патерном.
export const validateInputValue = (value, type) => {
  const regexPattern = regex[type];

  return regexPattern.test(value);
};
