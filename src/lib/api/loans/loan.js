import { apiConfig, http } from '@api/base';
import { toShortDate } from '@api/date';
import { getSearchTotal, prepareDateQuery, prepareSumQuery } from '@api/utils';
import { sessionManager } from '@authentication/services/SessionManager';
import _isEmpty from 'lodash/isEmpty';
import { DateTime } from 'luxon';
import { generatePath } from 'react-router-dom';
import { serializer } from './serializer';

const apiPaths = {
  checkout: '/circulation/loans/checkout',
  notificationOverdue: '/circulation/loans/:loanPid/notification-overdue',
  item: '/circulation/loans/:loanPid',
  list: '/circulation/loans/',
  request: '/circulation/loans/request',
  replaceItem: '/circulation/loans/:loanPid/replace-item',
  updateDates: '/circulation/loans/:loanPid/update-dates',
  bulkExtend: '/circulation/bulk-extend',
};

const get = async (loanPid) => {
  const path = generatePath(apiPaths.item, { loanPid: loanPid });
  const response = await http.get(path);
  response.data = serializer.fromJSON(response.data);
  return response;
};

const doAction = async (
  url,
  documentPid,
  patronPid,
  { itemPid = null, cancelReason = null } = {}
) => {
  const currentUser = sessionManager.user;
  const payload = {
    document_pid: documentPid,
    patron_pid: patronPid,
    transaction_location_pid: `${currentUser.locationPid}`,
    transaction_user_pid: `${currentUser.id}`,
  };
  if (itemPid) {
    payload.item_pid = itemPid;
  }
  if (cancelReason) {
    payload.cancel_reason = cancelReason;
  }

  const response = await http.post(url, payload);
  response.data = serializer.fromJSON(response.data);
  return response;
};

const doRequest = async (
  documentPid,
  patronPid,
  {
    requestExpireDate = null,
    requestStartDate = null,
    deliveryMethod = null,
  } = {}
) => {
  const currentUser = sessionManager.user;
  const payload = {
    document_pid: documentPid,
    patron_pid: patronPid,
    transaction_location_pid: `${currentUser.locationPid}`,
    transaction_user_pid: `${currentUser.id}`,
  };

  if (requestStartDate) {
    payload.request_start_date = requestStartDate;
  }
  if (requestExpireDate) {
    payload.request_expire_date = requestExpireDate;
  }
  if (deliveryMethod) {
    payload.delivery = {
      method: deliveryMethod,
    };
  }

  const response = await http.post(apiPaths.request, payload);
  response.data = serializer.fromJSON(response.data);
  return response;
};

const doCheckout = async (
  documentPid,
  itemPid,
  patronPid,
  { startDate = null, endDate = null, force = false } = {}
) => {
  const currentUser = sessionManager.user;
  const payload = {
    document_pid: documentPid,
    item_pid: itemPid,
    patron_pid: patronPid,
    transaction_location_pid: `${currentUser.locationPid}`,
    transaction_user_pid: `${currentUser.id}`,
  };

  if (startDate) {
    payload.start_date = startDate;
  }
  if (endDate) {
    payload.end_date = endDate;
  }
  if (force) {
    payload.force = true;
  }

  const response = await http.post(apiPaths.checkout, payload);
  response.data = serializer.fromJSON(response.data);
  return response;
};

const assignItemToLoan = async (itemPid, loanPid) => {
  const path = generatePath(apiPaths.replaceItem, { loanPid: loanPid });
  const payload = { item_pid: itemPid };
  const response = await http.post(path, payload);
  response.data = serializer.fromJSON(response.data);
  return response;
};

const bulkExtendLoans = async (patronPid) => {
  const payload = { patron_pid: patronPid };
  const response = await http.post(apiPaths.bulkExtend, payload);
  return response;
};

class QueryBuilder {
  constructor() {
    this.documentQuery = [];
    this.itemQuery = [];
    this.barcodeQuery = [];
    this.overdueQuery = [];
    this.patronQuery = [];
    this.renewedCountQuery = [];
    this.size = '';
    this.page = '';
    this.sortBy = '';
    this.startDateQuery = [];
    this.stateQuery = [];
    this.updatedQuery = [];
  }

  withDocPid(documentPid) {
    if (
      !documentPid ||
      (typeof documentPid != 'number' && _isEmpty(documentPid))
    ) {
      throw TypeError('DocumentPid argument missing');
    }
    this.documentQuery.push(`document_pid:${prepareSumQuery(documentPid)}`);
    return this;
  }

  withItemPid(itemPid) {
    if (!itemPid || (typeof itemPid != 'number' && _isEmpty(itemPid))) {
      throw TypeError('itemPid argument missing');
    }
    this.itemQuery.push(`item_pid.value:${prepareSumQuery(itemPid)}`);
    return this;
  }

  withItemBarcode(itemBarcode) {
    if (!itemBarcode || _isEmpty(itemBarcode)) {
      throw TypeError('itemBarcode argument missing');
    }
    this.barcodeQuery.push(`item.barcode:"${prepareSumQuery(itemBarcode)}"`);
    return this;
  }

  withPatronPid(patronPid) {
    if (!patronPid || (typeof patronPid != 'number' && _isEmpty(patronPid))) {
      throw TypeError('patronPid argument missing');
    }
    this.patronQuery.push(`patron_pid:${prepareSumQuery(patronPid)}`);
    return this;
  }

  withState(state) {
    if (!state || _isEmpty(state)) {
      throw TypeError('state argument missing');
    }
    this.stateQuery.push(`state:${prepareSumQuery(state)}`);
    return this;
  }

  overdue() {
    let now = toShortDate(DateTime.local());
    this.overdueQuery.push(encodeURI(`end_date:{* TO ${now}}`));
    return this;
  }

  withUpdated(dates) {
    this.updatedQuery.push(
      prepareDateQuery('_updated', dates.date, dates.from, dates.to)
    );
    return this;
  }

  withStartDate({ fromDate, toDate }) {
    if (fromDate || toDate)
      this.startDateQuery.push(
        prepareDateQuery('start_date', null, fromDate, toDate)
      );
    return this;
  }

  /**
   * Combine elasticsearch query for number of renewals
   * @param renewals string, number or array
   * when number it asks for exact number
   * in string there is possibility of passing comparison operators
   */
  withRenewedCount(renewals) {
    if (
      !renewals ||
      _isEmpty(renewals) ||
      !(typeof renewals === 'number' || typeof renewals === 'string')
    ) {
      throw TypeError('Renewal argument missing or invalid type');
    }
    this.renewedCountQuery.push(`extension_count:${renewals}`);
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

  sortByNewest() {
    this.sortBy = `&sort=-created`;
    return this;
  }

  sortByRequestStartDate() {
    this.sortBy = `&sort=-request_start_date`;
    return this;
  }

  qs() {
    const searchCriteria = this.documentQuery
      .concat(
        this.itemQuery,
        this.barcodeQuery,
        this.patronQuery,
        this.stateQuery,
        this.overdueQuery,
        this.updatedQuery,
        this.renewedCountQuery,
        this.startDateQuery
      )
      .join(' AND ');
    return `${searchCriteria}${this.sortBy}${this.size}${this.page}`;
  }
}

const queryBuilder = () => {
  return new QueryBuilder();
};

const list = async (query) => {
  const response = await http.get(`${apiPaths.list}?q=${query}`);
  response.data.total = getSearchTotal(response.data.hits);
  response.data.hits = response.data.hits.hits.map((hit) =>
    serializer.fromJSON(hit)
  );
  return response;
};

const sendOverdueLoansNotificationReminder = async (payload) => {
  const path = generatePath(apiPaths.notificationOverdue, {
    loanPid: payload.loanPid,
  });
  return await http.post(path, payload);
};

const count = async (query) => {
  const response = await http.get(`${apiPaths.list}?q=${query}`);
  response.data = getSearchTotal(response.data.hits);
  return response;
};

const updateDates = async (
  loanPid,
  {
    startDate = null,
    endDate = null,
    requestStartDate = null,
    requestExpireDate = null,
  } = {}
) => {
  const payload = {};
  if (startDate) {
    payload.start_date = startDate;
  }
  if (endDate) {
    payload.end_date = endDate;
  }
  if (requestStartDate) {
    payload.request_start_date = requestStartDate;
  }
  if (requestExpireDate) {
    payload.request_expire_date = requestExpireDate;
  }
  const path = generatePath(apiPaths.updateDates, {
    loanPid: loanPid,
  });
  return await http.post(path, payload);
};

export const loanApi = {
  searchBaseURL: `${apiConfig.baseURL}${apiPaths.list}`,
  assignItemToLoan: assignItemToLoan,
  query: queryBuilder,
  list: list,
  get: get,
  count: count,
  doAction: doAction,
  doRequest: doRequest,
  doCheckout: doCheckout,
  sendOverdueLoansNotificationReminder: sendOverdueLoansNotificationReminder,
  serializer: serializer,
  updateDates: updateDates,
  bulkExtendLoans: bulkExtendLoans,
};
