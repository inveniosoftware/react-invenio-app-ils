import { recordResponseSerializer } from '@api/utils';

const BorrowingRequestSerializers = {
  responseSerializer: function (hit) {
    return recordResponseSerializer(hit);
  },
};

export const borrowingRequestSerializer = {
  fromJSON: BorrowingRequestSerializers.responseSerializer,
};
