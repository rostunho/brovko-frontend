export const throttle = (cb, d) => {
  let id = 0;

  return function (e) {
    if (id) return;

    id = setTimeout(() => {
      id = 0;
      cb(e);
      clearTimeout(id);
    }, d || 300);
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
    }, d || 300);
  };
};
