import { BackOfficeBase } from '@routes/backoffice/backofficeUrls';
import { generatePath } from 'react-router-dom';

const AcquisitionBase = `${BackOfficeBase}/acquisition`;

const AcquisitionRoutesList = {
  orderCreate: `${AcquisitionBase}/orders/create`,
  orderDetails: `${AcquisitionBase}/orders/:orderPid`,
  orderEdit: `${AcquisitionBase}/orders/:orderPid/edit`,
  ordersList: `${AcquisitionBase}/orders`,
};

const AcquisitionRouteGenerators = {
  orderDetailsFor: (orderPid) =>
    generatePath(AcquisitionRoutesList.orderDetails, { orderPid: orderPid }),
  orderEditFor: (orderPid) =>
    generatePath(AcquisitionRoutesList.orderEdit, { orderPid: orderPid }),
  ordersListWithQuery: (qs) => `${AcquisitionRoutesList.ordersList}?q=${qs}`,
};

export const AcquisitionRoutes = {
  ...AcquisitionRoutesList,
  ...AcquisitionRouteGenerators,
};
