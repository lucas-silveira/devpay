export enum PolicyId {
  Default = 'default',
  Level1 = 'level1',
}

export const getAccepetedPolicyIds = (): PolicyId[] => {
  return Object.values(PolicyId);
};
