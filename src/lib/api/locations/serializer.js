import _isEmpty from 'lodash/isEmpty';

function serializeInternalLocationResponse(hit) {
  let result = {};
  if (!_isEmpty(hit)) {
    result['id'] = hit.id;
    result['created'] = hit.created;
    result['updated'] = hit.updated;
    if (hit.links) {
      result['links'] = hit.links;
    }
    if (!_isEmpty(hit.metadata)) {
      result['metadata'] = hit.metadata;
      result['pid'] = hit.metadata.pid;
    }
  }
  return result;
}

function serializeLocationResponse(hit) {
  let result = {};
  if (!_isEmpty(hit)) {
    result['id'] = hit.id;
    result['created'] = hit.created;
    result['updated'] = hit.updated;
    if (hit.links) {
      result['links'] = hit.links;
    }
    if (!_isEmpty(hit.metadata)) {
      result['metadata'] = hit.metadata;
      result['pid'] = hit.metadata.pid;
    }
  }
  return result;
}

export const internalLocationSerializer = {
  fromJSON: serializeInternalLocationResponse,
};

export const locationSerializer = {
  fromJSON: serializeLocationResponse,
};
