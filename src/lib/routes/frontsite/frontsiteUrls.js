import { generatePath } from 'react-router-dom';

const FrontSiteBase = '/';

const FrontSiteRoutesList = {
  home: FrontSiteBase,
  patronProfile: `${FrontSiteBase}profile`,
  documentsList: `${FrontSiteBase}search`,
  documentDetails: `${FrontSiteBase}literature/:documentPid`,
  documentRequestForm: `${FrontSiteBase}request`,
  openingHours: `${FrontSiteBase}opening-hours`,
  seriesDetails: `${FrontSiteBase}series/:seriesPid`,
  errors: `${FrontSiteBase}error`,
  selfCheckout: `${FrontSiteBase}selfcheckout`,
};

const FrontSiteRoutesGenerators = {
  documentsListWithQuery: (qs) =>
    `${FrontSiteRoutesList.documentsList}?q=${qs}`,
  documentDetailsFor: (documentPid) =>
    generatePath(FrontSiteRoutesList.documentDetails, {
      documentPid: documentPid,
    }),
  seriesDetailsFor: (seriesPid) =>
    generatePath(FrontSiteRoutesList.seriesDetails, {
      seriesPid: seriesPid,
    }),
};

export const FrontSiteRoutes = {
  ...FrontSiteRoutesGenerators,
  ...FrontSiteRoutesList,
};
