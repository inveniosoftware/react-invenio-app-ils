import _isEmpty from 'lodash/isEmpty';

function serializeResponse(hit) {
  let result = {};
  if (!_isEmpty(hit)) {
    result['id'] = hit.id;
    if (hit.links) {
      result['links'] = hit.links;
    }
    if (!_isEmpty(hit.metadata)) {
      result['metadata'] = hit.metadata;
    }
  }
  return result;
}

export const serializer = {
  fromJSON: serializeResponse,
};
