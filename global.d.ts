type Plain<T> = {
  [K in keyof T]: T[K];
};
