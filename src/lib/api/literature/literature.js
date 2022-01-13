import { apiConfig, http } from '@api/base';
import { getSearchTotal } from '@api/utils';
import { serializer } from './serializer';

const literatureURL = '/literature/';

const list = async (query) => {
  const response = await http.get(`${literatureURL}?q=${query}`);
  response.data.total = getSearchTotal(response.data.hits);
  response.data.hits = response.data.hits.hits.map((hit) =>
    serializer.fromJSON(hit)
  );
  return response;
};

class QueryBuilder {
  constructor() {
    this.extraParamsQuery = [];
    this.withSeriesQuery = [];
  }

  withSeriesPid(seriesPid, moi) {
    if (!seriesPid) {
      throw TypeError('Series PID argument missing');
    }
    if (moi === 'SERIAL') {
      this.withSeriesQuery.push(`relations.serial.pid_value:"${seriesPid}"`);
    } else {
      this.withSeriesQuery.push(
        `relations.multipart_monograph.pid_value:"${seriesPid}"`
      );
    }
    return this;
  }

  includeAll() {
    this.extraParamsQuery.push('include_all');
    return this;
  }

  sortBy(order) {
    if (!order) {
      throw TypeError('Sort order argument missing');
    }
    this.extraParamsQuery.push(`sort=${order}`);
    return this;
  }

  qs() {
    const searchQuery = this.withSeriesQuery.join(' AND ');
    const params =
      this.extraParamsQuery.length > 0
        ? `&${this.extraParamsQuery.join('&')}`
        : '';
    return `${searchQuery}${params}`;
  }
}

const queryBuilder = () => {
  return new QueryBuilder();
};

export const literatureApi = {
  searchBaseURL: `${apiConfig.baseURL}${literatureURL}`,
  list: list,
  query: queryBuilder,
  serializer: serializer,
};
