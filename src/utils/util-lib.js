export function throttle(callback, delay) {
    let id = 0;
  
    return function (e) {
      if (id) return;
  
      id = setTimeout(() => {
        callback(e);
        clearTimeout(id);
        id = 0;
      }, delay || 300);
    };
  }

export function debounce(callback, delay) {
    let id = 0;
  
    return function (e) {
      if (id) {
        clearTimeout(id);
        id = 0;
      }
  
      id = setTimeout(() => {
        callback(e);
        clearTimeout(id);
        id = 0;
      }, delay || 300);
    };
  }
  