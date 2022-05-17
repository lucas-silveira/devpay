import * as Utils from '@shared/utils';

type Config = {
  app: {
    httpPort: number;
  };
  database: {
    host: string;
    name: string;
    port: number;
    user: string;
    pass: string;
  };
};

const validate = (config: Record<string, unknown>, fieldName = 'config') => {
  const emptyValuesList = [];
  const addToList = (fieldName: string) => emptyValuesList.push(fieldName);

  Utils.ObjectChecker.checkIfHasEmptyFields(config, fieldName, addToList);

  if (emptyValuesList.length > 0)
    throw new Error(
      `The config file has empty values. The following env variables is missing: "${emptyValuesList.join(
        ', ',
      )}"`,
    );
};

const makeConfig = (): Config => ({
  app: {
    httpPort: Number(process.env.APP_HTTP_PORT),
  },
  database: {
    host: process.env.DATABASE_HOST,
    name: process.env.DATABASE_NAME,
    port: Number(process.env.DATABASE_PORT),
    user: process.env.DATABASE_USER,
    pass: process.env.DATABASE_PASS,
  },
});

export const makeConfigAndValidate = (): Config => {
  const config = makeConfig();
  if (process.env.NODE_ENV !== 'test') validate(config);
  return config;
};

export const makeConfigAndValidateFor = (field: keyof Config): Config => {
  const config = makeConfig();
  validate(config[field], `config.${field}`);
  return config;
};
