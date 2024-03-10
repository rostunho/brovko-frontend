export const throttle = (cb, d) => {
  console.log('start');
  let id = 0;
  return function (e) {
    if (id) return;

    id = setTimeout(() => {
      console.log('start cb');
      cb(e);
      clearTimeout(id);
      id = 0;
    }, d );
  };
};

export const debounce = (cb, d) => {
  let id = 0;

  return function (e) {
    if (id) {
      clearTimeout(id);
      id = 0;
    }

    id = setTimeout(() => {
      cb(e);
      clearTimeout(id);
      id = 0;
    }, d);
  };
};
