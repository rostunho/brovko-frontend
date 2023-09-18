export const validateValue = (value, regexPattern) => {
  return regexPattern.test(value);
};

export const emailRegex = /^[\w.-]+@[\w.-]+\.\w+$/;
