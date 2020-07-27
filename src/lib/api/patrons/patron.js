import { http, apiConfig } from '@api/base';
import { serializer } from './serializer';
import { invenioConfig } from '@config';
import { prepareSumQuery } from '@api/utils';

const listUrl = '/patrons/';
// Here we use a different url to access Patron details
// as patrons are only records indexed in elasticsearch
// but not stored in the database. Instead we are using
// `invenio_accounts_rest` users endpoint to retrieve
// individual patron's information.

const get = async patronPid => {
  const response = await http.get(`${listUrl}?q=id:${patronPid}`);
  response.data = serializer.fromJSON(response.data.hits.hits[0]);
  return response;
};

const list = async (queryText, wildcard = true) => {
  const response = await http.get(
    `${listUrl}?q=${queryText}${wildcard ? '*' : ''}`
  );
  response.data.total = response.data.hits.total;
  response.data.hits = response.data.hits.hits.map(hit =>
    serializer.fromJSON(hit)
  );
  return response;
};

class QueryBuilder {
  constructor() {
    this.patronQuery = [];
    this.emailQuery = [];
    this.nameQuery = [];
    this.patronUniqueIDQuery = [];
  }

  withEmail(email, wildcard = false) {
    if (!email) {
      throw TypeError('Email argument missing');
    }
    this.patronQuery.push(`email:${email}${wildcard ? '*' : ''}`);
    return this;
  }

  withName(name, wildcard = false) {
    if (!name) {
      throw TypeError('Name argument missing');
    }
    this.patronQuery.push(`name:${name}${wildcard ? '*' : ''}`);
    return this;
  }

  withPatronUniqueID(patronID) {
    if (!patronID) {
      throw TypeError('Patron Unique ID argument missing');
    }
    this.patronQuery.push(
      `${invenioConfig.PATRONS.patronUniqueID.field}:${patronID}`
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
