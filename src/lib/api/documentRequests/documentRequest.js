import { apiConfig, http } from '@api/base';
import { getSearchTotal, prepareSumQuery } from '@api/utils';
import _isEmpty from 'lodash/isEmpty';
import { generatePath } from 'react-router-dom';
import { serializer } from './serializer';

const documentRequestURL = '/document-requests/';
const apiPaths = {
  accept: `${documentRequestURL}:docReqPid/accept`,
  item: `${documentRequestURL}:docReqPid`,
  list: documentRequestURL,
  decline: `${documentRequestURL}:docReqPid/decline`,
  document: `${documentRequestURL}:docReqPid/document`,
  provider: `${documentRequestURL}:docReqPid/provider`,
};

const create = async (data) => {
  const response = await http.post(apiPaths.list, data);
  response.data = serializer.fromJSON(response.data);
  return response;
};

const update = async (docRequestPid, data) => {
  const path = generatePath(apiPaths.item, { docReqPid: docRequestPid });
  const response = await http.put(path, data);
  response.data = serializer.fromJSON(response.data);
  return response;
};

const get = async (docRequestPid) => {
  const path = generatePath(apiPaths.item, { docReqPid: docRequestPid });
  const response = await http.get(path);
  response.data = serializer.fromJSON(response.data);
  return response;
};

const del = async (docRequestPid) => {
  const path = generatePath(apiPaths.item, { docReqPid: docRequestPid });
  const response = await http.delete(path);
  return response;
};

const performAction = async (urlPath, data) => {
  const response = await http.post(urlPath, data);
  response.data = serializer.fromJSON(response.data);
  return response;
};

const accept = async (docRequestPid) => {
  const urlPath = generatePath(apiPaths.accept, { docReqPid: docRequestPid });
  return performAction(urlPath);
};

const addDocument = async (docReqPid, data) => {
  const url = generatePath(apiPaths.document, { docReqPid: docReqPid });
  return await http.post(url, data);
};

const removeDocument = async (docReqPid, data) => {
  const url = generatePath(apiPaths.document, { docReqPid: docReqPid });
  // https://github.com/axios/axios/issues/897#issuecomment-343715381
  return await http.delete(url, { data: data });
};

const addProvider = async (docReqPid, data) => {
  const url = generatePath(apiPaths.provider, { docReqPid: docReqPid });
  return await http.post(url, data);
};

const removeProvider = async (docReqPid) => {
  const url = generatePath(apiPaths.provider, { docReqPid: docReqPid });
  return await http.delete(url);
};

const decline = async (docRequestPid, data) => {
  const urlPath = generatePath(apiPaths.decline, { docReqPid: docRequestPid });
  return performAction(urlPath, data);
};

class QueryBuilder {
  constructor() {
    this.documentQuery = [];
    this.page = '';
    this.patronQuery = [];
    this.physicalItemProviderQuery = [];
    this.size = '';
    this.sortBy = '';
    this.stateQuery = [];
  }

  withState(state) {
    if (!state) {
      throw TypeError('State argument missing');
    }
    this.stateQuery.push(`state:${prepareSumQuery(state)}`);
    return this;
  }

  withDocPid(documentPid) {
    if (!documentPid) {
      throw TypeError('DocumentPid argument missing');
    }
    this.documentQuery.push(`document_pid:${prepareSumQuery(documentPid)}`);
    return this;
  }

  withPatronPid(patronPid) {
    if (!patronPid || (typeof patronPid != 'number' && _isEmpty(patronPid))) {
      throw TypeError('patronPid argument missing');
    }
    this.patronQuery.push(`patron_pid:${prepareSumQuery(patronPid)}`);
    return this;
  }

  withPhysicalItemProviderPid(physicalItemProviderPid, pidType) {
    if (!physicalItemProviderPid || _isEmpty(physicalItemProviderPid)) {
      throw TypeError('physicalItemProviderPid argument missing');
    }
    if (!pidType || _isEmpty(pidType)) {
      throw TypeError('physicalItemProviderPid argument missing');
    }
    this.physicalItemProviderQuery.push(
      `physical_item_provider.pid:${physicalItemProviderPid} AND physical_item_provider.pid_type:${pidType}`
    );
    return this;
  }

  withPage(page = 0) {
    if (page > 0) this.page = `&page=${page}`;
    return this;
  }

  withSize(size) {
    if (size > 0) this.size = `&size=${size}`;
    return this;
  }

  sortByNewest() {
    this.sortBy = `&sort=-created`;
    return this;
  }

  qs() {
    const searchCriteria = this.documentQuery
      .concat(this.patronQuery, this.stateQuery, this.physicalItemProviderQuery)
      .join(' AND ');
    return `${searchCriteria}${this.sortBy}${this.size}${this.page}`;
  }
}

const queryBuilder = () => {
  return new QueryBuilder();
};

const list = async (query) => {
  const response = await http.get(`${documentRequestURL}?q=${query}`);
  response.data.total = getSearchTotal(response.data.hits);
  response.data.hits = response.data.hits.hits.map((hit) =>
    serializer.fromJSON(hit)
  );
  return response;
};

const count = async (query) => {
  const response = await http.get(`${documentRequestURL}?q=${query}`);
  response.data = getSearchTotal(response.data.hits);
  return response;
};

export const documentRequestApi = {
  addDocument: addDocument,
  addProvider: addProvider,
  accept: accept,
  count: count,
  create: create,
  update: update,
  delete: del,
  get: get,
  list: list,
  query: queryBuilder,
  decline: decline,
  removeDocument: removeDocument,
  removeProvider: removeProvider,
  searchBaseURL: `${apiConfig.baseURL}${documentRequestURL}`,
  serializer: serializer,
};
