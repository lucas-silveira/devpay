export const fieldExists = (
  obj: Record<string, unknown>,
  field: string,
): boolean => Object.keys(obj || {}).includes(field);

export const checkIfHasEmptyFields = (
  value: unknown,
  fieldName: string,
  callback: (value: unknown) => void,
) => {
  const isEmpty = value === null || value === undefined || value === '';

  if (isEmpty) callback(fieldName);

  if (typeof value === 'object')
    Object.entries(value).forEach(([_fieldName, _value]) =>
      checkIfHasEmptyFields(_value, `${fieldName}.${_fieldName}`, callback),
    );
};
