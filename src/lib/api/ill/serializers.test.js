import { librarySerializer } from './serializers';

const stringDateTime = '2020-02-23T11:05:00+01:00';

describe('Library response serializer tests', () => {
  it('should serialize all fields from response', () => {
    const serialized = librarySerializer.fromJSON({
      id: 123,
      updated: stringDateTime,
      created: stringDateTime,
      links: 'test',
      metadata: {
        pid: '123',
        name: 'External library',
        address: 'Address',
        email: 'test@test.ch',
        phone: '12345',
        notes: 'Test',
      },
    });

    expect(serialized).toEqual({
      pid: '123',
      id: 123,
      updated: stringDateTime,
      created: stringDateTime,
      links: 'test',
      metadata: {
        pid: '123',
        name: 'External library',
        address: 'Address',
        email: 'test@test.ch',
        phone: '12345',
        notes: 'Test',
      },
    });
  });
});
