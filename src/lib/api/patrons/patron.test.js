import { patronApi } from './patron';
import { invenioConfig } from '@config';

jest.mock('@config');

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
    expect(query).toEqual('(email:test)');
  });

  it('should build query string with configured custom fields', () => {
    const mockValue = 'TestID';
    const query = patronApi
      .query()
      .withCustomField(mockValue)
      .qs();
    expect(query).toEqual(
      `(${invenioConfig.PATRONS.customFields.mockField.field}:${mockValue})`
    );
  });

  it('should build a query with combination of params', () => {
    const term = 'Vader';
    const query = patronApi
      .query()
      .withName(term, true)
      .withEmail(term, true)
      .withCustomField(term)
      .qs();
    expect(query).toEqual(
      `(name:${term}* OR email:${term} OR ${invenioConfig.PATRONS.customFields.mockField.field}:${term})`
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
