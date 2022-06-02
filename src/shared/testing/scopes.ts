enum TestScope {
  Unit = 'unit',
  Service = 'service',
  E2E = 'e2e',
  Database = 'database',
}

const envHasTheScope = (scope: TestScope): boolean => {
  if (!process.env.TEST_SCOPE) return true;

  return process.env.TEST_SCOPE?.includes(scope);
};

export const unitScope = envHasTheScope(TestScope.Unit)
  ? describe
  : describe.skip;

export const serviceScope = envHasTheScope(TestScope.Service)
  ? describe
  : describe.skip;

export const e2eScope = envHasTheScope(TestScope.E2E)
  ? describe
  : describe.skip;

export const databaseScope = envHasTheScope(TestScope.Database)
  ? describe
  : describe.skip;
