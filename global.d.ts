type OmitMethods<T> = Omit<
  T,
  {
    [K in keyof T]: T[K] extends (...args: any[]) => any ? K : never;
  }[keyof T]
>;

type Plain<T> = {
  [K in keyof OmitMethods<T>]: T[K] extends Record<string, any>
    ? Plain<T[K]>
    : T[K];
};
