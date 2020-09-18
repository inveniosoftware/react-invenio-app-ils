import { generatePath } from 'react-router-dom';

export const BackOfficeBase = '/backoffice';

const BackOfficeRoutesList = {
  home: BackOfficeBase,
  checkIn: `${BackOfficeBase}/checkin`,
  checkOut: `${BackOfficeBase}/checkout`,
  documentCreate: `${BackOfficeBase}/documents/create`,
  documentDetails: `${BackOfficeBase}/documents/:documentPid`,
  documentEdit: `${BackOfficeBase}/documents/:documentPid/edit`,
  documentRequestDetails: `${BackOfficeBase}/document-requests/:documentRequestPid`,
  documentRequestsList: `${BackOfficeBase}/document-requests`,
  documentsList: `${BackOfficeBase}/documents`,
  eitemCreate: `${BackOfficeBase}/eitems/create`,
  eitemDetails: `${BackOfficeBase}/eitems/:eitemPid`,
  eitemEdit: `${BackOfficeBase}/eitems/:eitemPid/edit`,
  eitemsList: `${BackOfficeBase}/eitems`,
  ilocationsCreate: `${BackOfficeBase}/internal-locations/create`,
  ilocationsEdit: `${BackOfficeBase}/internal-locations/:ilocationPid/edit`,
  itemCreate: `${BackOfficeBase}/items/create`,
  itemDetails: `${BackOfficeBase}/items/:itemPid`,
  itemEdit: `${BackOfficeBase}/items/:itemPid/edit`,
  itemsList: `${BackOfficeBase}/items`,
  loanDetails: `${BackOfficeBase}/loans/:loanPid`,
  loansList: `${BackOfficeBase}/loans`,
  locationsCreate: `${BackOfficeBase}/locations/create`,
  locationsEdit: `${BackOfficeBase}/locations/:locationPid/edit`,
  locationsDetails: `${BackOfficeBase}/locations/:locationPid`,
  locationsList: `${BackOfficeBase}/locations`,
  patronDetails: `${BackOfficeBase}/patrons/:patronPid`,
  patronsList: `${BackOfficeBase}/patrons`,
  seriesCreate: `${BackOfficeBase}/series/create`,
  seriesDetails: `${BackOfficeBase}/series/:seriesPid`,
  seriesEdit: `${BackOfficeBase}/series/:seriesPid/edit`,
  seriesList: `${BackOfficeBase}/series`,
  stats: {
    home: `${BackOfficeBase}/stats`,
  },
};

export const BackOfficeRouteGenerators = {
  documentEditFor: documentPid =>
    generatePath(BackOfficeRoutesList.documentEdit, {
      documentPid: documentPid,
    }),
  documentsListWithQuery: qs => `${BackOfficeRoutesList.documentsList}?q=${qs}`,
  documentDetailsFor: documentPid =>
    generatePath(BackOfficeRoutesList.documentDetails, {
      documentPid: documentPid,
    }),
  documentRequestsListWithQuery: qs =>
    `${BackOfficeRoutesList.documentRequestsList}?q=${qs}`,
  documentRequestDetailsFor: documentRequestPid =>
    generatePath(BackOfficeRoutesList.documentRequestDetails, {
      documentRequestPid: documentRequestPid,
    }),
  eitemDetailsFor: eitemPid =>
    generatePath(BackOfficeRoutesList.eitemDetails, { eitemPid: eitemPid }),
  eitemEditFor: eitemPid =>
    generatePath(BackOfficeRoutesList.eitemEdit, { eitemPid: eitemPid }),
  eItemsListWithQuery: qs => `${BackOfficeRoutesList.eitemsList}?q=${qs}`,
  itemsListWithQuery: qs => `${BackOfficeRoutesList.itemsList}?q=${qs}`,
  itemDetailsFor: itemPid =>
    generatePath(BackOfficeRoutesList.itemDetails, { itemPid: itemPid }),
  itemEditFor: itemPid =>
    generatePath(BackOfficeRoutesList.itemEdit, { itemPid: itemPid }),
  loansListWithQuery: qs => `${BackOfficeRoutesList.loansList}?q=${qs}`,
  loanDetailsFor: loanPid =>
    generatePath(BackOfficeRoutesList.loanDetails, { loanPid: loanPid }),
  ilocationsEditFor: ilocationPid =>
    generatePath(BackOfficeRoutesList.ilocationsEdit, {
      ilocationPid: ilocationPid,
    }),
  locationsEditFor: locationPid =>
    generatePath(BackOfficeRoutesList.locationsEdit, {
      locationPid: locationPid,
    }),
  locationsDetailsFor: locationPid =>
    generatePath(BackOfficeRoutesList.locationsDetails, {
      locationPid: locationPid,
    }),
  patronDetailsFor: patronPid =>
    generatePath(BackOfficeRoutesList.patronDetails, { patronPid: patronPid }),
  seriesListWithQuery: qs => `${BackOfficeRoutesList.seriesList}?q=${qs}`,
  seriesDetailsFor: seriesPid =>
    generatePath(BackOfficeRoutesList.seriesDetails, { seriesPid: seriesPid }),
  seriesEditFor: seriesPid =>
    generatePath(BackOfficeRoutesList.seriesEdit, {
      seriesPid: seriesPid,
    }),
};

export const BackOfficeRoutes = {
  ...BackOfficeRoutesList,
  ...BackOfficeRouteGenerators,
};
