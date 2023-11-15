// перетворює звичайний рядок в рядок формату +38 (000) 000 0000
export const toPhoneFormat = string => {
  const temp = [...string];
  temp.splice(3, 0, ' (');
  string.length > 6 && temp.splice(7, 0, ') ');
  string.length > 10 && temp.splice(11, 0, ' ');

  return temp.join('');
};

// парсить рядок "телефонного формату" у звичайний
export const parsePhoneNumber = value => {
  const result = value.replace(/[\s()]/g, '');
  return result;
};

console.log(toPhoneFormat('+380932132134'));

console.log(parsePhoneNumber('+38 (093) 213 2134'));
