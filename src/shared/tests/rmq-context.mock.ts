export const rmqContextMock = {
  getChannelRef: () => ({
    ack: jest.fn(),
  }),
  getMessage: () => ({}),
};
