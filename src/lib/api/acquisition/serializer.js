/*
 * SPDX-FileCopyrightText: 2021 CERN.
 * SPDX-License-Identifier: MIT
 */

import { recordResponseSerializer } from '@api/utils';

const OrderSerializers = {
  responseSerializer: function (hit) {
    // This line is needed to get the resolved fields
    // to be able to display them later in the form
    hit.metadata.order_lines = hit.metadata.resolved_order_lines;
    return recordResponseSerializer(hit);
  },
};

export const orderSerializer = {
  fromJSON: OrderSerializers.responseSerializer,
};
