export const describeif = Boolean(process.env.DB_TEST)
  ? describe
  : describe.skip;
