/*
 * SPDX-FileCopyrightText: 2020-2021 CERN.
 * SPDX-License-Identifier: MIT
 */

import { documentRequestApi } from './documentRequest';

describe('Document request query builder tests', () => {
  it('should build query string with a state', () => {
    const query = documentRequestApi.query().withState('PENDING').qs();
    expect(query).toEqual('state:PENDING');
  });
});
