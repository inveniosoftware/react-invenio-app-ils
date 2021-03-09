import { apiConfig, http } from '@api/base';
import { serializer } from './serializer';

const providerUrl = '/providers/';

const get = async (providerPid) => {
  console.log(providerPid);
  const response = await http.get(`${providerUrl}${providerPid}`);
  response.data = serializer.fromJSON(response.data);
  return response;
};

const del = async (providerPid) => {
  const response = await http.delete(`${providerUrl}${providerPid}`);
  return response;
};

const create = async (data) => {
  const response = await http.post(`${providerUrl}`, data);
  response.data = serializer.fromJSON(response.data);
  return response;
};

const update = async (providerPid, data) => {
  const response = await http.put(`${providerUrl}${providerPid}`, data);
  response.data = serializer.fromJSON(response.data);
  return response;
};

const list = async (query = '', size = 100) => {
  const response = await http.get(`${providerUrl}?q=${query}&size=${size}`);
  response.data.total = response.data.hits.total;
  response.data.hits = response.data.hits.hits.map((hit) =>
    serializer.fromJSON(hit)
  );
  return response;
};

export const providerApi = {
  searchBaseURL: `${apiConfig.baseURL}${providerUrl}`,
  create: create,
  delete: del,
  get: get,
  list: list,
  update: update,
  url: providerUrl,
};
