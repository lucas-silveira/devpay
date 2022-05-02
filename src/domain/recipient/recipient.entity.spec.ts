import { Recipient } from './recipient.entity';

describe('Recipient', () => {
  it('Should be able to create a Recipient correctly', () => {
    expect(
      new Recipient(undefined, 'John', 'Snow', 'john@snow.com', '123456789'),
    ).toEqual({
      firstName: 'John',
      lastName: 'Snow',
      email: 'john@snow.com',
      document: '123456789',
    });
  });
});
