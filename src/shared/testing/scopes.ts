enum TestScope {
  Unit = 'unit',
  Integration = 'integration',
  E2E = 'e2e',
}

const envHasTheScope = (scope: TestScope): boolean => {
  if (!process.env.TEST_SCOPE) return true;

  return process.env.TEST_SCOPE?.includes(scope);
};

export const unitScope = envHasTheScope(TestScope.Unit)
  ? describe
  : describe.skip;

export const integrationScope = envHasTheScope(TestScope.Integration)
  ? describe
  : describe.skip;

export const e2eScope = envHasTheScope(TestScope.E2E)
  ? describe
  : describe.skip;
