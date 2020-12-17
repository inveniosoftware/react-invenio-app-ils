import { recordResponseSerializer } from '@api/utils';

const LibrarySerializers = {
  responseSerializer: function (hit) {
    return recordResponseSerializer(hit);
  },
};

const BorrowingRequestSerializers = {
  responseSerializer: function (hit) {
    return recordResponseSerializer(hit);
  },
};

export const librarySerializer = {
  fromJSON: LibrarySerializers.responseSerializer,
};

export const borrowingRequestSerializer = {
  fromJSON: BorrowingRequestSerializers.responseSerializer,
};
