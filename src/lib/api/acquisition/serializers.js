import { recordResponseSerializer } from '@api/utils';

const OrderSerializers = {
  responseSerializer: function(hit) {
    return recordResponseSerializer(hit);
  },
};

const VendorSerializers = {
  responseSerializer: function(hit) {
    return recordResponseSerializer(hit);
  },
};

export const orderSerializer = {
  fromJSON: OrderSerializers.responseSerializer,
};

export const vendorSerializer = {
  fromJSON: VendorSerializers.responseSerializer,
};
