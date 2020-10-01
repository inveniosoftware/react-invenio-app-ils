import { recordResponseSerializer } from '@api/utils';

const DocumentSerializers = {
  responseSerializer: function(hit) {
    return recordResponseSerializer(hit);
  },
};

export const documentSerializer = {
  fromJSON: DocumentSerializers.responseSerializer,
};
