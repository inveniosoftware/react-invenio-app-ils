import { http } from '@api/base';
import _has from 'lodash/has';

const userURL = '/me';

const get = async () => {
  const res = await http.get(userURL);
  if (_has(res, 'data.id')) {
    res.data.id = res.data.id.toString();
  }
  return res;
};

const loans = documentPid => {
  const loansURL = '/loans';
  return http.get(`${userURL}${loansURL}?document_pid=${documentPid}`);
};

export const userApi = {
  get: get,
  loans: loans,
};
