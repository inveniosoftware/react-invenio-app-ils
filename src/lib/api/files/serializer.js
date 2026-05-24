/*
 * SPDX-FileCopyrightText: 2020 CERN.
 * SPDX-License-Identifier: MIT
 */

import _isEmpty from 'lodash/isEmpty';

export function serializeResponse(data) {
  const result = {};
  if (!_isEmpty(data)) {
    result.checksum = data.checksum;
    result.key = data.key;
    result.mimetype = data.mimetype;
    result.size = data.size;
    result.version_id = data.version_id;
  }
  return result;
}

export const serializer = {
  fromJSON: serializeResponse,
};
