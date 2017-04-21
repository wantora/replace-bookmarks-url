export default function throttle(fn, timeout) {
  let timeoutID = null;
  
  return (...args) => {
    clearTimeout(timeoutID);
    timeoutID = setTimeout(() => {
      fn(...args);
    }, timeout);
  };
}
