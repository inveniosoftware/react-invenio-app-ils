import _isEmpty from 'lodash/isEmpty';
import { DateTime } from 'luxon';

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

function serializeLocationClosurePeriodsResponse(hit) {
  let result = [];
  if (!_isEmpty(hit) && Array.isArray(hit.closure_periods)) {
    hit.closure_periods.forEach((period) => {
      result.push({
        start: new DateTime.fromISO(period.start),
        end: new DateTime.fromISO(period.end),
      });
    });
  }
  return result;
}

export const internalLocationSerializer = {
  fromJSON: serializeInternalLocationResponse,
};

export const locationSerializer = {
  fromJSON: serializeLocationResponse,
};

export const locationClosurePeriodsSerializer = {
  fromJSON: serializeLocationClosurePeriodsResponse,
};
