import { apiConfig, http } from '@api/base';
import { getSearchTotal, prepareSumQuery } from '@api/utils';
import { invenioConfig } from '@config';
import { orderSerializer as serializer } from './serializer';

const orderURL = '/acquisition/orders/';

const get = async (pid) => {
  const response = await http.get(`${orderURL}${pid}`);
  response.data = serializer.fromJSON(response.data);
  return response;
};

const create = async (data) => {
  const resp = await http.post(`${orderURL}`, data);
  resp.data = serializer.fromJSON(resp.data);
  return resp;
};

const update = async (pid, data) => {
  const response = await http.put(`${orderURL}${pid}`, data);
  response.data = serializer.fromJSON(response.data);
  return response;
};

const list = async (query) => {
  const response = await http.get(`${orderURL}?q=${query}`);
  response.data.total = getSearchTotal(response.data.hits);
  response.data.hits = response.data.hits.hits.map((hit) =>
    serializer.fromJSON(hit)
  );
  return response;
};

const listWithPendingStatus = async (query) => {
  const searchCriteria = orderApi
    .query()
    .withState(`(${invenioConfig.ACQ_ORDERS.pendingStatuses.join(' OR ')})`)
    .withQuery(query)
    .qs();
  const response = await http.get(`${orderURL}?q=${searchCriteria}`);
  response.data.total = getSearchTotal(response.data.hits);
  response.data.hits = response.data.hits.hits.map((hit) =>
    serializer.fromJSON(hit)
  );
  return response;
};

const count = async (query) => {
  const response = await http.get(`${orderURL}?q=${query}`);
  response.data = getSearchTotal(response.data.hits);
  return response;
};

class QueryBuilder {
  constructor() {
    this.patronQuery = [];
    this.recipientQuery = [];
    this.documentQuery = [];
    this.providerQuery = [];
    this.providerPidQuery = [];
    this.query = [];
    this.sortByQuery = '';
    this.stateQuery = [];
  }

  withState(state) {
    if (!state) {
      throw TypeError('State argument missing');
    }
    this.stateQuery.push(`status:${prepareSumQuery(state)}`);
    return this;
  }

  withPatron(patronPid) {
    if (!patronPid) {
      throw TypeError('Patron PID argument missing');
    }
    this.patronQuery.push(`order_lines.patron_pid:${patronPid}`);
    return this;
  }

  withDocPid(documentPid) {
    if (!documentPid) {
      throw TypeError('DocumentPid argument missing');
    }
    this.documentQuery.push(
      `order_lines.document_pid:${prepareSumQuery(documentPid)}`
    );
    return this;
  }

  withRecipient(recipient) {
    if (!recipient) {
      throw TypeError('Recipient argument missing');
    }
    this.recipientQuery.push(`recipient:${recipient}`);
    return this;
  }

  withProvider(name) {
    if (!name) {
      throw TypeError('Provider name argument missing');
    }
    this.providerQuery.push(`provider.name:"${name}"`);
    return this;
  }

  withProviderPid(pid) {
    if (!pid) {
      throw TypeError('Provider pid argument missing');
    }
    this.providerPidQuery.push(`provider_pid:${pid}`);
    return this;
  }

  withQuery(query) {
    if (!query) {
      throw TypeError('Query argument missing');
    }
    this.query.push(`${query}`);
    return this;
  }

  sortBy(order = 'bestmatch') {
    this.sortByQuery = `&sort=${order}`;
    return this;
  }

  qs() {
    const searchCriteria = this.patronQuery
      .concat(this.recipientQuery, this.providerQuery, this.providerPidQuery)
      .concat(this.stateQuery)
      .concat(this.documentQuery)
      .concat(this.query)
      .join(' AND ');
    return `${searchCriteria}${this.sortByQuery}`;
  }
}

const queryBuilder = () => {
  return new QueryBuilder();
};

export const orderApi = {
  searchBaseURL: `${apiConfig.baseURL}${orderURL}`,
  get: get,
  create: create,
  update: update,
  list: list,
  listWithPendingStatus: listWithPendingStatus,
  count: count,
  query: queryBuilder,
  serializer: serializer,
};
