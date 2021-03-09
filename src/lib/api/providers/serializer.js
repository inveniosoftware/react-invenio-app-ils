import { recordResponseSerializer } from '@api/utils';

const ProviderSerializers = {
  responseSerializer: function (hit) {
    return recordResponseSerializer(hit);
  },
};

export const serializer = {
  fromJSON: ProviderSerializers.responseSerializer,
};
