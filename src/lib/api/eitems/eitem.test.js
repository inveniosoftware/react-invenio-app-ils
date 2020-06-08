import { eItemApi } from './eitem';

describe('EItem query builder tests', () => {
  it('should build query string with document PID', () => {
    const query = eItemApi
      .query()
      .withDocPid(5)
      .qs();
    expect(query).toEqual('document_pid:5');
  });

  it('should throw error for empty params', () => {
    expect(() => {
      eItemApi
        .query()
        .withDocPid()
        .qs();
    }).toThrow();
  });
});

describe('Loan list url request test', () => {});
