import { apiConfig, http } from '@api/base';
import { getSearchTotal, prepareSumQuery } from '@api/utils';
import { invenioConfig } from '@config';
import _forOwn from 'lodash/forOwn';
import { serializer } from './serializer';

const listUrl = '/patrons/';
// Here we use a different url to access Patron details
// as patrons are only records indexed in elasticsearch
// but not stored in the database. Instead we are using
// `invenio_accounts_rest` users endpoint to retrieve
// individual patron's information.

const get = async (patronPid) => {
  const response = await http.get(`${listUrl}?q=id:${patronPid}`);
  response.data = serializer.fromJSON(response.data.hits.hits[0]);
  return response;
};

const list = async (queryText, wildcard = true) => {
  const response = await http.get(
    `${listUrl}?q=${queryText}${wildcard ? '*' : ''}`
  );
  response.data.total = getSearchTotal(response.data.hits);
  response.data.hits = response.data.hits.hits.map((hit) =>
    serializer.fromJSON(hit)
  );
  return response;
};

class QueryBuilder {
  constructor() {
    this.patronQuery = [];
  }

  withEmail(email) {
    if (!email) {
      throw TypeError('Email argument missing');
    }
    this.patronQuery.push(`email:${email}`);
    return this;
  }

  withName(name, wildcard = false) {
    if (!name) {
      throw TypeError('Name argument missing');
    }
    this.patronQuery.push(`name:${name}${wildcard ? '*' : ''}`);
    return this;
  }

  withPid(pid) {
    if (!pid) {
      throw TypeError('PID argument is missing');
    }
    this.patronQuery.push(`pid:${pid}`);
    return this;
  }
  withCustomField(term) {
    if (!term) {
      throw TypeError('Custom field term argument is missing');
    }
    _forOwn(invenioConfig.PATRONS.customFields, (value, key) =>
      this.patronQuery.push(`${value.field}:${term}`)
    );
    return this;
  }

  qs() {
    return `${prepareSumQuery(this.patronQuery)}`;
  }
}

const queryBuilder = () => {
  return new QueryBuilder();
};

export const patronApi = {
  searchBaseURL: `${apiConfig.baseURL}${listUrl}`,
  get: get,
  list: list,
  query: queryBuilder,
};
