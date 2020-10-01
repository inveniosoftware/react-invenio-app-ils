import { apiConfig, http } from '@api/base';
import { prepareSumQuery } from '@api/utils';
import { sessionManager } from '@authentication/services/SessionManager';

const borrowingRequestUrl = '/ill/borrowing-requests/';

const get = async pid => {
  const response = await http.get(`${borrowingRequestUrl}${pid}`);
  return response;
};

const create = async data => {
  const resp = await http.post(`${borrowingRequestUrl}`, data);
  return resp;
};

const update = async (borrowingRequestPid, data) => {
  const resp = await http.put(
    `${borrowingRequestUrl}${borrowingRequestPid}`,
    data
  );
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

const requestExtension = async borrowingRequestPid => {
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

const declineExtension = async borrowingRequestPid => {
  const resp = await http.post(
    `${borrowingRequestUrl}${borrowingRequestPid}/patron-loan/extension/decline`
  );
  return resp;
};

const list = async query => {
  const response = await http.get(`${borrowingRequestUrl}?q=${query}`);
  response.data.total = response.data.hits.total;
  return response;
};

class QueryBuilder {
  constructor() {
    this.page = '';
    this.patronQuery = [];
    this.libraryQuery = [];
    this.libraryPidQuery = [];
    this.size = '';
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
    this.patronQuery.push(`patron_pid:${patronPid}`);
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

  withLibrary(name) {
    if (!name) {
      throw TypeError('Library name argument missing');
    }
    this.libraryQuery.push(`library.name:"${name}"`);
    return this;
  }

  withLibraryPid(pid) {
    if (!pid) {
      throw TypeError('Library pid argument missing');
    }
    this.libraryPidQuery.push(`library_pid:${pid}`);
    return this;
  }

  sortBy(order = 'bestmatch') {
    this.sortByQuery = `&sort=${order}`;
    return this;
  }

  qs() {
    const searchCriteria = this.patronQuery
      .concat(this.libraryQuery, this.libraryPidQuery)
      .concat(this.stateQuery)
      .join(' AND ');
    return `(${searchCriteria})${this.sortByQuery}${this.size}${this.page}`;
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
  update: update,
  createLoan: createLoan,
  requestExtension: requestExtension,
  acceptExtension: acceptExtension,
  declineExtension: declineExtension,
  query: queryBuilder,
  url: borrowingRequestUrl,
};
