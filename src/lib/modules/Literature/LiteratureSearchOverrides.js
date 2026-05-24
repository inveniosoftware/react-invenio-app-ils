/*
 * SPDX-FileCopyrightText: 2020 CERN.
 * SPDX-License-Identifier: MIT
 */

import { LiteratureSearchResultsGrid } from '@modules/Literature/LiteratureSearchResultsGrid';
import { LiteratureSearchResultsList } from '@modules/Literature/LiteratureSearchResultsList';

export const LiteratureSearchOverridesMap = {
  ResultsList: LiteratureSearchResultsList,
  ResultsGrid: LiteratureSearchResultsGrid,
};
