import { BackOfficeBase } from '@routes/backoffice/backofficeUrls';
import { generatePath } from 'react-router-dom';

const AcquisitionBase = `${BackOfficeBase}/acquisition`;

const AcquisitionRoutesList = {
  orderCreate: `${AcquisitionBase}/orders/create`,
  orderDetails: `${AcquisitionBase}/orders/:orderPid`,
  orderEdit: `${AcquisitionBase}/orders/:orderPid/edit`,
  ordersList: `${AcquisitionBase}/orders`,
  vendorCreate: `${AcquisitionBase}/vendors/create`,
  vendorDetails: `${AcquisitionBase}/vendors/:vendorPid`,
  vendorEdit: `${AcquisitionBase}/vendors/:vendorPid/edit`,
  vendorsList: `${AcquisitionBase}/vendors`,
};

const AcquisitionRouteGenerators = {
  orderDetailsFor: orderPid =>
    generatePath(AcquisitionRoutesList.orderDetails, { orderPid: orderPid }),
  orderEditFor: orderPid =>
    generatePath(AcquisitionRoutesList.orderEdit, { orderPid: orderPid }),
  ordersListWithQuery: qs => `${AcquisitionRoutesList.ordersList}?q=${qs}`,
  vendorDetailsFor: vendorPid =>
    generatePath(AcquisitionRoutesList.vendorDetails, { vendorPid: vendorPid }),
  vendorEditFor: vendorPid =>
    generatePath(AcquisitionRoutesList.vendorEdit, { vendorPid: vendorPid }),
  vendorsListWithQuery: qs => `${AcquisitionRoutesList.vendorsList}?q=${qs}`,
};

export const AcquisitionRoutes = {
  ...AcquisitionRoutesList,
  ...AcquisitionRouteGenerators,
};
