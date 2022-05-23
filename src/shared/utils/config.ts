import * as ObjectChecker from './object-checker';

const validate = (config: Record<string, unknown>, fieldName = 'config') => {
  const emptyValuesList = [];
  const addToList = (fieldName: string) => emptyValuesList.push(fieldName);

  ObjectChecker.checkIfHasEmptyFields(config, fieldName, addToList);

  if (emptyValuesList.length > 0)
    throw new Error(
      `The config file has empty values. The following env variables is missing: "${emptyValuesList.join(
        ', ',
      )}"`,
    );
};

export const makeAndValidate = <T extends Record<string, unknown>>(
  makeConfig: () => T,
): T => {
  const config = makeConfig();
  if (process.env.NODE_ENV !== 'test') validate(config);
  return config;
};

export const makeAndValidateFor = <T extends Record<string, unknown>>(
  makeConfig: () => T,
  field: keyof T,
): T => {
  const config = makeConfig();
  validate(<Record<string, unknown>>config[field], `config.${field}`);
  return config;
};
