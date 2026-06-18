/*
 * SPDX-FileCopyrightText: 2020-2021 CERN.
 * SPDX-License-Identifier: MIT
 */

import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

// Track the last URL managed by React Router. When a POP fires and the URL
// hasn't changed, it means we're unwinding an iframe-added joint session
// history entry (e.g. from an embedded map). Skip it by going back further.
let currentPath = history.location.pathname + history.location.search;

history.listen((location, action) => {
  const newPath = location.pathname + location.search;
  if (action === 'POP' && newPath === currentPath) {
    history.goBack();
    return;
  }
  currentPath = newPath;
  window.scrollTo(0, 0);
});

export const goTo = (path, state = {}) => {
  history.push(path, state);
};

export const replaceTo = (path, state = {}) => {
  history.replace(path, state);
};

export const goBack = () => {
  history.goBack();
};

export default history;
