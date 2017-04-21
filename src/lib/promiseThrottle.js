export default function promiseThrottle(fn) {
  let promise = null;
  
  return (...args) => {
    if (!promise) {
      promise = fn(...args).then((value) => {
        promise = null;
        return value;
      });
    }
    return promise;
  };
}
