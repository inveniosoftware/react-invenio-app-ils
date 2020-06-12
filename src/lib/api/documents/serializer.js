import { fromISO, toISODate } from '@api/date';
import { recordResponseSerializer } from '@api/utils';
import _get from 'lodash/get';
import _set from 'lodash/set';
import _keys from 'lodash/keys';
import _merge from 'lodash/merge';

const transformDates = metadata => {
  DocumentSerializers.DATE_FIELDS.forEach(field => {
    const dateStr = _get(metadata, field);
    if (dateStr) {
      _set(metadata, field, fromISO(dateStr));
    }
  });
};

const transformExtensions = metadata => {
  let result = {};
  const { extensions = {} } = metadata;
  _keys(extensions).map(key => {
    const [objName, objProp] = key.split(':');
    result[objName] = _merge({}, result[objName]);
    result[objName][objProp] = extensions[key];
    return result;
  });
  _set(metadata, 'extensions', result);
};

const DocumentSerializers = {
  DATE_FIELDS: ['circulation.next_available_date'],
  responseSerializer: function(hit) {
    const result = recordResponseSerializer(hit, function(metadata) {
      transformDates(metadata);
      transformExtensions(metadata);
    });
    return result;
  },
  requestSerializer: function(data) {
    DocumentSerializers.DATE_FIELDS.forEach(field => {
      const dateObj = _get(data, field);
      if (dateObj) {
        _set(data, field, toISODate(dateObj));
      }
    });
    return data;
  },
};

export const documentSerializer = {
  fromJSON: DocumentSerializers.responseSerializer,
  toJSON: DocumentSerializers.requestSerializer,
};
