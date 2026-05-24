/*
 * SPDX-FileCopyrightText: 2020-2021 CERN.
 * SPDX-License-Identifier: MIT
 */

import './commands';

Cypress.Cookies.defaults({
  preserve: 'csrftoken',
});

Cypress.config('viewportWidth', 1280);
Cypress.config('viewportHeight', 800);
