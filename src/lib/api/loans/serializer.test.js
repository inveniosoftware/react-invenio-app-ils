import { serializer } from './serializer';

const stringDate = '2018-01-01T11:05:00+01:00';

describe('Loans serialization tests', () => {
  it('It should serialize the empty loan object', () => {
    const serialized = serializer.fromJSON({
      id: 123,
      updated: stringDate,
      created: stringDate,
      metadata: {},
    });

    expect(serialized).toEqual({
      id: 123,
      updated: stringDate,
      created: stringDate,
      availableActions: {},
    });
  });
});
