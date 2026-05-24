/*
 * SPDX-FileCopyrightText: 2020-2021 CERN.
 * SPDX-License-Identifier: MIT
 */

import { recordResponseSerializer } from '@api/utils';

const DocumentSerializers = {
  responseSerializer: function (hit) {
    return recordResponseSerializer(hit);
  },
};

export const documentSerializer = {
  fromJSON: DocumentSerializers.responseSerializer,
};
