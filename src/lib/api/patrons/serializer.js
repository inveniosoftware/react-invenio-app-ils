import _isEmpty from 'lodash/isEmpty';

export function serializeResponse(hit) {
  const result = {};
  if (!_isEmpty(hit)) {
    result['user_pid'] = hit.id.toString();
    result['links'] = hit.links;
    if (!_isEmpty(hit.metadata)) {
      result['metadata'] = hit.metadata;
    }
  }
  return result;
}

export const serializer = {
  fromJSON: serializeResponse,
};
