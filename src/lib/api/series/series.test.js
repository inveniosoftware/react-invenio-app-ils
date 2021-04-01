import { seriesApi } from './series';

describe('Series query builder tests', () => {
  it('should build query string with a mode of issuance', () => {
    const query = seriesApi
      .query()
      .withModeOfIssuance('MULTIPART_MONOGRAPH')
      .qs();
    expect(query).toEqual('mode_of_issuance:MULTIPART_MONOGRAPH');
  });

  it('should build the query string for series of a type', () => {
    const query = seriesApi.query().withSeriesType('SERIAL').qs();
    expect(query).toEqual('series_type:"SERIAL"');
  });
});
