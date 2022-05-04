import { ageInMonths } from './date';

describe('Date', () => {
  describe('ageInMonths', () => {
    it('Should be able to get the age in months', () => {
      const today = new Date();
      today.setMonth(today.getMonth() - 2);

      expect(ageInMonths(today)).toBe(2);
    });
  });
});
