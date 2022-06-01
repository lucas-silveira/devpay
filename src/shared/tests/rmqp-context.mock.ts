export const rmqpContextMock = {
  getChannelRef: () => ({
    ack: jest.fn(),
  }),
  getMessage: () => ({}),
};
