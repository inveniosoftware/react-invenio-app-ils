/*
 * SPDX-FileCopyrightText: 2020 CERN.
 * SPDX-License-Identifier: MIT
 */

import * as testData from '@testData/documents.json';
import { render } from '@testing-library/react'
import React from 'react';
import DocumentCirculation from './DocumentCirculation';

describe('DocumentCirculation tests', () => {
  let component;
  afterEach(() => {
    if (component) {
      component.unmount();
    }
  });

  const document = {
    metadata: {
      ...testData[0],
      items: { total: 2 },
      circulation: { available_items_for_loan_count: 2 },
    },
  };

  it('should load the DocumentCirculation component', () => {
    const { asFragment } = render(
      <DocumentCirculation document={document} />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
