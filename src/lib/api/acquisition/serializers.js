import { recordResponseSerializer } from '@api/utils';

const OrderSerializers = {
  responseSerializer: function(hit) {
    // This line is needed to get the resolved fields
    // to be able to display them later in the form
    hit.metadata.order_lines = hit.metadata.resolved_order_lines;
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
