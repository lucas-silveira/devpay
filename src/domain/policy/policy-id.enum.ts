export enum PolicyId {
  Default = 'default',
  Level1 = 'level1',
}

export const getAcceptedPolicyIds = (): PolicyId[] => {
  return Object.values(PolicyId);
};
