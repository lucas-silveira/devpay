export const fieldExists = (
  obj: Record<string, unknown>,
  field: string,
): boolean => Object.keys(obj || {}).includes(field);
