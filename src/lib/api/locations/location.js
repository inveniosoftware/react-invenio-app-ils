import { http } from '@api/base';
import { getSearchTotal } from '@api/utils';
import {
  locationSerializer as serializer,
  locationClosurePeriodsSerializer as closurePeriodsSerializer,
} from './serializer';

const locationURL = '/locations/';

const apiPaths = {
  closure_periods: `/closure_periods/`,
};

const get = async (locationPid) => {
  const response = await http.get(`${locationURL}${locationPid}`);
  response.data = serializer.fromJSON(response.data);
  return response;
};

const del = async (locationPid) => {
  return await http.delete(`${locationURL}${locationPid}`);
};

const create = async (data) => {
  const resp = await http.post(`${locationURL}`, data);
  resp.data = serializer.fromJSON(resp.data);
  return resp;
};

const update = async (locationPid, data) => {
  const response = await http.put(`${locationURL}${locationPid}`, data);
  response.data = serializer.fromJSON(response.data);
  return response;
};

const list = async (query = '', size = 100) => {
  const response = await http.get(`${locationURL}?q=${query}&size=${size}`);
  response.data.total = getSearchTotal(response.data.hits);
  response.data.hits = response.data.hits.hits.map((hit) =>
    serializer.fromJSON(hit)
  );
  return response;
};

const getClosurePerdiods = async (locationPid, year) => {
  const response = await http.get(
    `${locationURL}${locationPid}${apiPaths.closure_periods}${year}`
  );
  response.data = closurePeriodsSerializer.fromJSON(response.data);
  return response;
};

export const locationApi = {
  list: list,
  get: get,
  delete: del,
  create: create,
  update: update,
  url: locationURL,
  getClosurePerdiods: getClosurePerdiods,
};
