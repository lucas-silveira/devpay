type OmitMethods<T> = Pick<
  T,
  {
    [K in keyof T]: T[K] extends (...args: any[]) => any ? never : K;
  }[keyof T]
>;

type Plain<T> = {
  -readonly [K in keyof OmitMethods<T>]: T[K] extends Record<string, any>
    ? Plain<T[K]>
    : T[K];
};
