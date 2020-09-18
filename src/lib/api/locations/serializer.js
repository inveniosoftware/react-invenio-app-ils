import _isEmpty from 'lodash/isEmpty';
import { fromISO } from '@api/date';
import _get from 'lodash/get';
import { toISODate } from '@api/date';
import _set from 'lodash/set';

const LocationRequestSerializers = {
  DATE_FIELDS: ['start_date', 'end_date'],
  requestSerializer: function(data) {
    LocationRequestSerializers.DATE_FIELDS.forEach(field => {
      if (!_isEmpty(data['opening_exceptions'])) {
        data['opening_exceptions'].forEach(elem => {
          const dateObj = _get(elem, field);
          if (dateObj && typeof dateObj === 'object') {
            _set(elem, field, toISODate(dateObj));
          }
        });
      }
    });
    return data;
  },
};

function serializeInternalLocationResponse(hit) {
  let result = {};
  if (!_isEmpty(hit)) {
    result['id'] = hit.id;
    result['created'] = fromISO(hit.created);
    result['updated'] = fromISO(hit.updated);
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
    result['created'] = fromISO(hit.created);
    result['updated'] = fromISO(hit.updated);
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
  toJSON: LocationRequestSerializers.requestSerializer,
};
