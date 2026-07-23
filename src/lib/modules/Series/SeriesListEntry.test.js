/*
 * SPDX-FileCopyrightText: 2020 CERN.
 * SPDX-License-Identifier: MIT
 */

import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SeriesListEntry from './SeriesListEntry';
import * as testData from '@testData/series.json';

it('should render correctly', () => {
  const data = {
    metadata: {
      ...testData[0],
    },
  };

  const { asFragment } = render(
    <MemoryRouter>
      <SeriesListEntry metadata={data.metadata} />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});
