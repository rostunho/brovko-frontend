export const isNumericString = string => {
  const check = isNaN(string);
  const result = !check;
  return result;
};
