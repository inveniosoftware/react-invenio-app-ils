/*
 * SPDX-FileCopyrightText: 2020 CERN.
 * SPDX-License-Identifier: MIT
 */

import * as testData from '@testData/documents.json';
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom';
import React from 'react';
import DocumentListEntry from './DocumentListEntry';

it('should render correctly', () => {
  const data = {
    metadata: {
      ...testData[0],
      pid: '13',
      eitems: { hits: [], total: 0 },
      circulation: {
        available_items_for_loan_count: 0,
      },
    },
  };

  const { asFragment } = render(
    <MemoryRouter>
      <DocumentListEntry metadata={data.metadata} />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});
