/*
 * SPDX-FileCopyrightText: 2020-2021 CERN.
 * SPDX-License-Identifier: MIT
 */

import { generatePath } from 'react-router-dom';
const AuthenticationBase = '/';

const AuthenticationRoutesList = {
  login: `${AuthenticationBase}login`,
  redirectUrlAfterLogin: `${AuthenticationBase}login?next=:nextUrl`,
  confirmEmail: `${AuthenticationBase}confirm-email`,
};

const AuthenticationRoutesGenerators = {
  redirectAfterLogin: (nextUrl) =>
    generatePath(AuthenticationRoutesList.redirectUrlAfterLogin, {
      nextUrl: nextUrl,
    }),
};

export const AuthenticationRoutes = {
  ...AuthenticationRoutesList,
  ...AuthenticationRoutesGenerators,
};
