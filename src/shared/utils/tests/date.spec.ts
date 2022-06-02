import * as Tests from '@shared/tests';
import { ageInMonths } from '../date';

Tests.unitScope('Date', () => {
  describe('ageInMonths', () => {
    it('Should be able to get the age in months', () => {
      const today = new Date();
      today.setMonth(today.getMonth() - 2);

      expect(ageInMonths(today)).toBe(2);
    });
  });
});
