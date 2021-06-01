import { apiConfig, http } from '@api/base';
import { getSearchTotal, prepareSumQuery } from '@api/utils';
import { sessionManager } from '@authentication/services/SessionManager';
import { invenioConfig } from '@config';
import { borrowingRequestSerializer as serializer } from './serializer';

const borrowingRequestUrl = '/ill/borrowing-requests/';

const get = async (pid) => {
  const response = await http.get(`${borrowingRequestUrl}${pid}`);
  response.data = serializer.fromJSON(response.data);
  return response;
};

const create = async (data) => {
  const resp = await http.post(`${borrowingRequestUrl}`, data);
  resp.data = serializer.fromJSON(resp.data);
  return resp;
};

const update = async (borrowingRequestPid, data) => {
  const resp = await http.put(
    `${borrowingRequestUrl}${borrowingRequestPid}`,
    data
  );
  resp.data = serializer.fromJSON(resp.data);
  return resp;
};

const createLoan = async (borrowingRequestPid, loanStartDate, loanEndDate) => {
  const currentUser = sessionManager.user;
  const payload = {
    loan_start_date: loanStartDate,
    loan_end_date: loanEndDate,
    transaction_location_pid: `${currentUser.locationPid}`,
  };
  const resp = await http.post(
    `${borrowingRequestUrl}${borrowingRequestPid}/patron-loan/create`,
    payload
  );
  return resp;
};

const requestExtension = async (borrowingRequestPid) => {
  const resp = await http.post(
    `${borrowingRequestUrl}${borrowingRequestPid}/patron-loan/extension/request`
  );
  return resp;
};

const acceptExtension = async (borrowingRequestPid, loanEndDate) => {
  const currentUser = sessionManager.user;
  const payload = {
    loan_end_date: loanEndDate,
    transaction_location_pid: `${currentUser.locationPid}`,
  };
  const resp = await http.post(
    `${borrowingRequestUrl}${borrowingRequestPid}/patron-loan/extension/accept`,
    payload
  );
  return resp;
};

const declineExtension = async (borrowingRequestPid) => {
  const resp = await http.post(
    `${borrowingRequestUrl}${borrowingRequestPid}/patron-loan/extension/decline`
  );
  return resp;
};

const list = async (query) => {
  const response = await http.get(`${borrowingRequestUrl}?q=${query}`);
  response.data.total = getSearchTotal(response.data.hits);
  response.data.hits = response.data.hits.hits.map((hit) =>
    serializer.fromJSON(hit)
  );
  return response;
};

const listWithPendingStatus = async (query) => {
  const searchCriteria = borrowingRequestApi
    .query()
    .withState(
      `(${invenioConfig.ILL_BORROWING_REQUESTS.pendingStatuses.join(' OR ')})`
    )
    .withQuery(query)
    .qs();
  const response = await http.get(`${borrowingRequestUrl}?q=${searchCriteria}`);
  response.data.total = getSearchTotal(response.data.hits);
  response.data.hits = response.data.hits.hits.map((hit) =>
    serializer.fromJSON(hit)
  );
  return response;
};

const count = async (query) => {
  const response = await http.get(`${borrowingRequestUrl}?q=${query}`);
  response.data = getSearchTotal(response.data.hits);
  return response;
};

class QueryBuilder {
  constructor() {
    this.page = '';
    this.patronQuery = [];
    this.providerQuery = [];
    this.providerPidQuery = [];
    this.documentQuery = [];
    this.query = [];
    this.size = '';
    this.sortByQuery = '';
    this.stateQuery = [];
    this.patronLoanExtensionStatusQuery = [];
  }

  withState(state) {
    if (!state) {
      throw TypeError('State argument missing');
    }
    this.stateQuery.push(`status:${prepareSumQuery(state)}`);
    return this;
  }

  withDocPid(documentPid) {
    if (!documentPid) {
      throw TypeError('DocumentPid argument missing');
    }
    this.documentQuery.push(`document_pid:${prepareSumQuery(documentPid)}`);
    return this;
  }

  withPatron(patronPid) {
    if (!patronPid) {
      throw TypeError('Patron PID argument missing');
    }
    this.patronQuery.push(`patron_pid:${patronPid}`);
    return this;
  }

  withPatronLoanExtensionStatus(status) {
    if (!status) {
      throw TypeError('Status argument missing');
    }
    this.patronLoanExtensionStatusQuery.push(
      `patron_loan.extension.status:${prepareSumQuery(status)}`
    );
    return this;
  }

  withSize(size) {
    if (size > 0) this.size = `&size=${size}`;
    return this;
  }

  withPage(page = 0) {
    if (page > 0) this.page = `&page=${page}`;
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
      .concat(this.providerQuery, this.providerPidQuery)
      .concat(this.stateQuery)
      .concat(this.patronLoanExtensionStatusQuery)
      .concat(this.documentQuery)
      .concat(this.query)
      .join(' AND ');
    return `${searchCriteria}${this.sortByQuery}${this.size}${this.page}`;
  }
}

const queryBuilder = () => {
  return new QueryBuilder();
};

export const borrowingRequestApi = {
  searchBaseURL: `${apiConfig.baseURL}${borrowingRequestUrl}`,
  create: create,
  get: get,
  list: list,
  listWithPendingStatus: listWithPendingStatus,
  update: update,
  createLoan: createLoan,
  requestExtension: requestExtension,
  acceptExtension: acceptExtension,
  declineExtension: declineExtension,
  count: count,
  query: queryBuilder,
  url: borrowingRequestUrl,
};
