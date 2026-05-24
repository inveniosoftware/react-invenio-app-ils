/*
 * SPDX-FileCopyrightText: 2020-2021 CERN.
 * SPDX-License-Identifier: MIT
 */

import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

history.listen((_) => {
  window.scrollTo(0, 0);
});

export const goTo = (path, state = {}) => {
  history.push(path, state);
};

export const replaceTo = (path, state = {}) => {
  history.push(path, state);
};

export const goBack = () => {
  history.goBack();
};

export default history;
