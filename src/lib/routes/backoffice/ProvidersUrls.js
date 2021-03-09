import { BackOfficeBase } from '@routes/backoffice/backofficeUrls';
import { generatePath } from 'react-router-dom';

const ProvidersBase = `${BackOfficeBase}/providers`;

const ProviderRoutesList = {
  providerCreate: `${ProvidersBase}/create`,
  providerDetails: `${ProvidersBase}/:providerPid`,
  providerEdit: `${ProvidersBase}/:providerPid/edit`,
  providersList: `${ProvidersBase}`,
};

const ProviderRouteGenerators = {
  providerDetailsFor: (providerPid) =>
    generatePath(ProviderRoutesList.providerDetails, {
      providerPid: providerPid,
    }),
  providerEditFor: (providerPid) =>
    generatePath(ProviderRoutesList.providerEdit, {
      providerPid: providerPid,
    }),
  providersListWithQuery: (qs) => `${ProviderRoutesList.providersList}?q=${qs}`,
};

export const ProviderRoutes = {
  ...ProviderRoutesList,
  ...ProviderRouteGenerators,
};
