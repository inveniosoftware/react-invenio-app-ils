import { recordResponseSerializer } from '@api/utils';

const LibrarySerializers = {
  responseSerializer: function(hit) {
    return recordResponseSerializer(hit);
  },
};

export const librarySerializer = {
  fromJSON: LibrarySerializers.responseSerializer,
};
