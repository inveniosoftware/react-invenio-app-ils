import { NotFound } from '@components/HttpErrors';
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { BackOfficeRoutes, AcquisitionRoutes, ILLRoutes } from '@routes/urls';
import { BorrowingRequestDetails } from '@pages/backoffice/ILL/BorrowingRequest/BorrowingRequestDetails';
import { BorrowingRequestEditor } from '@pages/backoffice/ILL/BorrowingRequest/BorrowingRequestEditor/BorrowingRequestEditor';
import { BorrowingRequestSearch } from '@pages/backoffice/ILL/BorrowingRequest/BorrowingRequestSearch/BorrowingRequestSearch';
import { CheckOut } from '@pages/backoffice/Actions/CheckOut/CheckOut';
import { DocumentDetails } from '@pages/backoffice/Document/DocumentDetails';
import { DocumentEditor } from '@pages/backoffice/Document/DocumentForms';
import { DocumentSearch } from '@pages/backoffice/Document/DocumentSearch';
import { DocumentRequestDetails } from '@pages/backoffice/DocumentRequest/DocumentRequestDetails';
import { DocumentRequestSearch } from '@pages/backoffice/DocumentRequest/DocumentRequestSearch';

import { EItemDetails } from '@pages/backoffice/EItem/EItemDetails';
import { EItemEditor } from '@pages/backoffice/EItem/EItemForms';
import { EItemSearch } from '@pages/backoffice/EItem/EItemSearch';
import Home from '@pages/backoffice/Home/Home';
import { InternalLocationEditor } from '@pages/backoffice/Location/LocationForms';
import { ItemDetails } from '@pages/backoffice/Item/ItemDetails';
import { ItemEditor } from '@pages/backoffice/Item/ItemForms';
import { ItemSearch } from '@pages/backoffice/Item/ItemSearch';
import {
  LibraryDetails,
  LibraryEditor,
  LibrarySearch,
} from '@pages/backoffice/ILL/Library';
import { LoanDetails } from '@pages/backoffice/Loan/LoanDetails';
import { LoanSearch } from '@pages/backoffice/Loan/LoanSearch';
import { LocationEditor } from '@pages/backoffice/Location/LocationForms';
import { LocationList } from '@pages/backoffice/Location/LocationList';
import { LocationDetails } from '@pages/backoffice/Location/LocationDetails';
import { OrderDetails } from '@pages/backoffice/Acquisition/Order/OrderDetails';
import { OrderEditor } from '@pages/backoffice/Acquisition/Order/OrderEditor';
import { OrderSearch } from '@pages/backoffice/Acquisition/Order/OrderSearch';
import { PatronDetails } from '@pages/backoffice/Patron/PatronDetails';
import { PatronSearch } from '@pages/backoffice/Patron/PatronSearch';
import { SeriesDetails } from '@pages/backoffice/Series/SeriesDetails';
import { SeriesEditor } from '@pages/backoffice/Series/SeriesForms';
import { SeriesSearch } from '@pages/backoffice/Series/SeriesSearch';
import Stats from '@pages/backoffice/Stats/Stats';
import { VendorDetails } from '@pages/backoffice/Acquisition/Vendor/VendorDetails';
import { VendorEditor } from '@pages/backoffice/Acquisition/Vendor/VendorEditor';
import { VendorSearch } from '@pages/backoffice/Acquisition/Vendor/VendorSearch';
import CheckIn from '@pages/backoffice/Actions/CheckIn/CheckIn';

export default class BackOfficeRoutesSwitch extends Component {
  render() {
    return (
      <Switch>
        <Route exact path={BackOfficeRoutes.home} component={Home} />
        {/* documents */}
        <Route
          exact
          path={BackOfficeRoutes.documentCreate}
          component={DocumentEditor}
        />
        <Route
          exact
          path={BackOfficeRoutes.documentsList}
          component={DocumentSearch}
        />
        <Route
          exact
          path={BackOfficeRoutes.documentEdit}
          component={DocumentEditor}
        />
        <Route
          exact
          path={BackOfficeRoutes.documentDetails}
          component={DocumentDetails}
        />
        {/* eitems */}
        <Route
          exact
          path={BackOfficeRoutes.eitemsList}
          component={EItemSearch}
        />
        <Route
          exact
          path={BackOfficeRoutes.eitemCreate}
          component={EItemEditor}
        />
        <Route
          exact
          path={BackOfficeRoutes.eitemEdit}
          component={EItemEditor}
        />
        <Route
          exact
          path={BackOfficeRoutes.eitemDetails}
          component={EItemDetails}
        />
        {/*/!* items *!/*/}
        <Route exact path={BackOfficeRoutes.itemsList} component={ItemSearch} />
        <Route
          exact
          path={BackOfficeRoutes.itemCreate}
          component={ItemEditor}
        />
        <Route exact path={BackOfficeRoutes.itemEdit} component={ItemEditor} />
        <Route
          exact
          path={BackOfficeRoutes.itemDetails}
          component={ItemDetails}
        />
        {/* loans */}
        <Route exact path={BackOfficeRoutes.loansList} component={LoanSearch} />
        <Route
          exact
          path={BackOfficeRoutes.loanDetails}
          component={LoanDetails}
        />
        {/* internal locations */}
        <Route
          exact
          path={BackOfficeRoutes.ilocationsCreate}
          component={InternalLocationEditor}
        />
        <Route
          exact
          path={BackOfficeRoutes.ilocationsEdit}
          component={InternalLocationEditor}
        />
        {/* locations */}
        <Route
          exact
          path={BackOfficeRoutes.locationsList}
          component={LocationList}
        />
        <Route
          exact
          path={BackOfficeRoutes.locationsCreate}
          component={LocationEditor}
        />
        <Route
          exact
          path={BackOfficeRoutes.locationsEdit}
          component={LocationEditor}
        />
        <Route
          exact
          path={BackOfficeRoutes.locationsDetails}
          component={LocationDetails}
        />
        {/*/!* patrons *!/*/}
        <Route
          exact
          path={BackOfficeRoutes.patronsList}
          component={PatronSearch}
        />
        <Route
          exact
          path={BackOfficeRoutes.patronDetails}
          component={PatronDetails}
        />
        {/*/!* series *!/*/}
        <Route
          exact
          path={BackOfficeRoutes.seriesList}
          component={SeriesSearch}
        />
        <Route
          exact
          path={BackOfficeRoutes.seriesCreate}
          component={SeriesEditor}
        />
        <Route
          exact
          path={BackOfficeRoutes.seriesEdit}
          component={SeriesEditor}
        />
        <Route
          exact
          path={BackOfficeRoutes.seriesDetails}
          component={SeriesDetails}
        />
        {/* document requests */}
        <Route
          exact
          path={BackOfficeRoutes.documentRequestDetails}
          component={DocumentRequestDetails}
        />
        <Route
          exact
          path={BackOfficeRoutes.documentRequestsList}
          component={DocumentRequestSearch}
        />
        {/* vendors */}
        <Route
          exact
          path={AcquisitionRoutes.vendorsList}
          component={VendorSearch}
        />
        <Route
          exact
          path={AcquisitionRoutes.vendorCreate}
          component={VendorEditor}
        />
        <Route
          exact
          path={AcquisitionRoutes.vendorEdit}
          component={VendorEditor}
        />
        <Route
          exact
          path={AcquisitionRoutes.vendorDetails}
          component={VendorDetails}
        />
        {/* orders */}
        <Route
          exact
          path={AcquisitionRoutes.ordersList}
          component={OrderSearch}
        />
        <Route
          exact
          path={AcquisitionRoutes.orderCreate}
          component={OrderEditor}
        />
        <Route
          exact
          path={AcquisitionRoutes.orderEdit}
          component={OrderEditor}
        />
        <Route
          exact
          path={AcquisitionRoutes.orderDetails}
          component={OrderDetails}
        />
        {/*/!* ILL *!/*/}
        <Route exact path={ILLRoutes.libraryList} component={LibrarySearch} />
        <Route exact path={ILLRoutes.libraryCreate} component={LibraryEditor} />
        <Route exact path={ILLRoutes.libraryEdit} component={LibraryEditor} />
        <Route
          exact
          path={ILLRoutes.libraryDetails}
          component={LibraryDetails}
        />
        <Route
          exact
          path={ILLRoutes.borrowingRequestList}
          component={BorrowingRequestSearch}
        />
        <Route
          exact
          path={ILLRoutes.borrowingRequestCreate}
          component={BorrowingRequestEditor}
        />
        <Route
          exact
          path={ILLRoutes.borrowingRequestEdit}
          component={BorrowingRequestEditor}
        />
        <Route
          exact
          path={ILLRoutes.borrowingRequestDetails}
          component={BorrowingRequestDetails}
        />
        <Route exact path={BackOfficeRoutes.stats.home} component={Stats} />
        <Route exact path={BackOfficeRoutes.checkIn} component={CheckIn} />
        <Route exact path={BackOfficeRoutes.checkOut} component={CheckOut} />
        <Route>
          <NotFound />
        </Route>
      </Switch>
    );
  }
}
