import { apiConfig, http } from '@api/base';
import { add as addRelation, remove as removeRelation } from '@api/relations';
import { getSearchTotal, prepareSumQuery } from '@api/utils';
import { documentSerializer as serializer } from './serializer';

const documentURL = '/documents/';

const get = async (documentPid) => {
  const response = await http.get(`${documentURL}${documentPid}`);
  response.data = serializer.fromJSON(response.data);
  return response;
};

const create = async (data) => {
  const resp = await http.post(`${documentURL}`, data);
  resp.data = serializer.fromJSON(resp.data);
  return resp;
};

const update = async (docPid, data) => {
  const response = await http.put(`${documentURL}${docPid}`, data);
  response.data = serializer.fromJSON(response.data);
  return response;
};

const del = async (docPid) => {
  return await http.delete(`${documentURL}${docPid}`);
};

const viewEvent = async (docPid) => {
  return await http.post(`${documentURL}${docPid}/stats`, {
    event: 'record-view',
  });
};

const createRelation = async (
  referrer,
  relatedList,
  relationType,
  extra = {}
) => {
  const url = `${documentURL}${referrer.metadata.pid}`;
  const resp = addRelation(url, referrer, relatedList, relationType, extra);
  resp.data = serializer.fromJSON(resp.data);
  return resp;
};

const deleteRelation = async (referrer, relation) => {
  const url = `${documentURL}${referrer.metadata.pid}`;
  const relationType = relation.relation_type;
  const resp = removeRelation(url, referrer, relation, relationType);
  resp.data = serializer.fromJSON(resp.data);
  return resp;
};

class QueryBuilder {
  constructor() {
    this.overbookedQuery = [];
    this.currentlyOnLoanQuery = [];
    this.availableItemsQuery = [];
    this.withPendingLoansQuery = [];
    this.withTagQuery = [];
    this.size = '';
    this.withDocumentTypeQuery = [];
    this.withEitemsQuery = [];
    this.pendingOverdueQuery = [];
    this.withSeriesQuery = [];
    this.sortByQuery = '';
    this.sortOrderQuery = '';
  }

  overbooked() {
    this.overbookedQuery.push('circulation.overbooked:true');
    return this;
  }

  currentlyOnLoan() {
    this.currentlyOnLoanQuery.push('circulation.active_loans_count:>0');
    return this;
  }

  withAvailableItems() {
    this.availableItemsQuery.push(
      'circulation.available_items_for_loan_count:>0'
    );
    return this;
  }

  withPendingLoans() {
    this.withPendingLoansQuery.push('circulation.pending_loans_count:>0');
    return this;
  }

  withTag(tag) {
    if (!tag) {
      throw TypeError('Tag argument missing');
    }
    this.withTagQuery.push(`tags:"${tag}"`);
    return this;
  }

  withSize(size) {
    if (size > 0) this.size = `&size=${size}`;
    return this;
  }

  withDocumentType(documentType) {
    if (!documentType) {
      throw TypeError('documentType argument missing');
    }
    this.withDocumentTypeQuery.push(`document_type:"${documentType}"`);
    return this;
  }

  withEitems() {
    this.withEitemsQuery.push('eitems.total:>0');
    return this;
  }

  withSeriesPid(seriesPid, moi) {
    if (!seriesPid) {
      throw TypeError('Series PID argument missing');
    }
    if (moi === 'SERIAL') {
      this.withSeriesQuery.push(
        `relations.serial.pid_value:${prepareSumQuery(seriesPid)}`
      );
    } else {
      this.withSeriesQuery.push(
        `relations.multipart_monograph.pid_value:${prepareSumQuery(seriesPid)}`
      );
    }
    return this;
  }

  pendingOverdue() {
    const query = [
      'circulation.available_items_for_loan_count:0',
      'circulation.pending_loans_count:>0',
      'circulation.overdue_loans_count:>0',
      'items.total:>0',
    ];
    this.pendingOverdueQuery.push(encodeURI(query.join(' AND ')));
    return this;
  }

  sortBy(by = 'bestmatch') {
    this.sortByQuery = `&sort=${by}`;
    return this;
  }

  sortOrder(order = 'asc') {
    this.sortOrderQuery = `&order=${order}`;
    return this;
  }

  qs() {
    const searchCriteria = this.overbookedQuery
      .concat(
        this.currentlyOnLoanQuery,
        this.availableItemsQuery,
        this.withPendingLoansQuery,
        this.withTagQuery,
        this.withDocumentTypeQuery,
        this.withEitemsQuery,
        this.pendingOverdueQuery,
        this.withSeriesQuery
      )
      .join(' AND ');
    return `${searchCriteria}${this.sortByQuery}${this.sortOrderQuery}${this.size}`;
  }
}

const queryBuilder = () => {
  return new QueryBuilder();
};

const list = async (query) => {
  const response = await http.get(`${documentURL}?q=${query}`);
  response.data.total = getSearchTotal(response.data.hits);
  response.data.hits = response.data.hits.hits.map((hit) =>
    serializer.fromJSON(hit)
  );
  return response;
};

const count = async (query) => {
  const response = await http.get(`${documentURL}?q=${query}`);
  response.data = getSearchTotal(response.data.hits);
  return response;
};

export const documentApi = {
  searchBaseURL: `${apiConfig.baseURL}${documentURL}`,
  get: get,
  create: create,
  update: update,
  delete: del,
  viewEvent: viewEvent,
  createRelation: createRelation,
  deleteRelation: deleteRelation,
  list: list,
  count: count,
  query: queryBuilder,
  serializer: serializer,
};
