export const databaseTest = Boolean(process.env.DB_TEST)
  ? describe
  : describe.skip;
