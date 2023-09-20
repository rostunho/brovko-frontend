// перетворює звичайний рядок в рядок формату +38 (000) 000 0000
export const toPhoneFormat = string => {
  const temp = string.split('');

  temp.splice(3, 0, ' (');
  temp.splice(7, 0, ') ');
  temp.splice(11, 0, ' ');

  return temp.join('');
};

// парсить рядок "телефонного формату" у звичайний
export const parsePhoneNumber = value => {
  const result = value.replace(/[\s()]/g, '');
  return console.log(result);
};
