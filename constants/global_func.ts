export function error_wrapper<T, B>(callback: (arg?: T) => void): unknown {
  const wrapper = (args?: T) => {
    try {
      callback(args);
    } catch (error) {
      console.log(error);
    }
  };
  return wrapper;
}
