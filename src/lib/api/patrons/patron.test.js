import { patronApi } from './patron';
import { invenioConfig } from '@config';

describe('Patron query builder tests', () => {
  it('should build query string with patron name', () => {
    const query = patronApi
      .query()
      .withName('Vader')
      .qs();
    expect(query).toEqual('(name:Vader)');
  });

  it('should build query string with matching patron name', () => {
    const query = patronApi
      .query()
      .withName('Vader', true)
      .qs();
    expect(query).toEqual('(name:Vader*)');
  });

  it('should build query string for the exact patron email', () => {
    const query = patronApi
      .query()
      .withEmail('test@email.com')
      .qs();
    expect(query).toEqual('(email:test@email.com)');
  });

  it('should build query string for searching mathing patron email', () => {
    const query = patronApi
      .query()
      .withEmail('test', true)
      .qs();
    expect(query).toEqual('(email:test*)');
  });

  it('should build query string with configured patron unique ID', () => {
    const query = patronApi
      .query()
      .withPatronUniqueID('UniqueID')
      .qs();
    expect(query).toEqual(
      `(${invenioConfig.PATRONS.patronUniqueID.field}:UniqueID)`
    );
  });

  it('should build a query with combination of params', () => {
    const query = patronApi
      .query()
      .withName('Vader', true)
      .withEmail('Vader', true)
      .withPatronUniqueID('Vader')
      .qs();
    expect(query).toEqual(
      `(name:Vader* OR email:Vader* OR ${invenioConfig.PATRONS.patronUniqueID.field}:Vader)`
    );
  });

  it('should not return anything for empty params', () => {
    expect(() => {
      patronApi
        .query()
        .withState()
        .qs()
        .toThrow();
    });
  });
});
