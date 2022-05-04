import { differenceInMonths } from 'date-fns';

export const ageInMonths = (aDate: Date): number => {
  return differenceInMonths(new Date(), aDate);
};
