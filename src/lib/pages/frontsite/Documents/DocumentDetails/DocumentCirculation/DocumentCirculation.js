import { RedirectToLoginButton } from '@authentication/components/RedirectToLoginButton';
import { AuthenticationGuard } from '@authentication/components/AuthenticationGuard';
import { ILSImagePlaceholder } from '@components/ILSPlaceholder';
import Overridable from 'react-overridable';
import { DocumentEItems } from './DocumentEItems';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Button, Header, Segment } from 'semantic-ui-react';
import { LoanRequestForm } from '../LoanRequestForm';
import { InfoMessage } from '@components/InfoMessage';
import { FrontSiteRoutes } from '@routes/urls';
import { Link } from 'react-router-dom';
import { LoanInformationBullets } from './LoanInformationBullets';
import _get from 'lodash/get';

class DocumentCirculation extends Component {
  loginToLoan = () => {
    const {
      documentDetails: {
        metadata: { circulation },
      },
    } = this.props;
    return (
      <>
        <LoanInformationBullets circulation={circulation} />
        <RedirectToLoginButton content="Sign in to loan" fluid positive />
      </>
    );
  };

  renderLoanRequestForm = () => {
    const { documentDetails, loansInfo } = this.props;
    return (
      <LoanRequestForm
        document={documentDetails}
        lastLoan={_get(loansInfo, 'last_loan')}
      />
    );
  };

  myLoansButton = () => {
    return (
      <Link to={FrontSiteRoutes.patronProfile}>
        <Button fluid>View your loans</Button>
      </Link>
    );
  };

  renderRequestable = () => {
    return (
      <AuthenticationGuard
        authorizedComponent={this.renderLoanRequestForm}
        loginComponent={this.loginToLoan}
      />
    );
  };

  renderPendingRequest = () => {
    return (
      <>
        <InfoMessage message="You have requested a loan for this literature." />
        {this.myLoansButton()}
      </>
    );
  };

  renderOnLoan = () => {
    const message = (
      <>
        You have an ongoing loan for this literature. You may request an
        extension on <Link to={FrontSiteRoutes.patronProfile}>Your loans</Link>{' '}
        page.
      </>
    );
    return (
      <>
        <InfoMessage message={message} />
        {this.myLoansButton()}
      </>
    );
  };

  render() {
    const {
      documentDetails,
      isLoading,
      loansInfo,
      loanRequestIsLoading,
      showTab,
    } = this.props;
    const {
      has_active_loan: userHasActiveLoan,
      is_requested: userHasPendingRequest,
    } = loansInfo || {};
    const hasNeither = !userHasPendingRequest && !userHasActiveLoan;
    return (
      <Segment
        loading={loanRequestIsLoading}
        className="highlighted fs-segment-transparent"
      >
        <ILSImagePlaceholder style={{ height: 400 }} isLoading={isLoading}>
          <DocumentEItems
            eitems={documentDetails.metadata.eitems}
            showTab={showTab}
            documentDetails={documentDetails}
          />
          <Header as="h3" className="mt-10" content="Request loan" />
          {hasNeither
            ? this.renderRequestable()
            : userHasPendingRequest
            ? this.renderPendingRequest()
            : this.renderOnLoan()}
          <Overridable
            id="DocumentCirculation.Extras"
            documentDetails={documentDetails}
          />
        </ILSImagePlaceholder>
      </Segment>
    );
  }
}

DocumentCirculation.propTypes = {
  documentDetails: PropTypes.object.isRequired,
  loansInfo: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  showTab: PropTypes.func.isRequired,
  loanRequestIsLoading: PropTypes.bool,
};

DocumentCirculation.defaultProps = {
  loanRequestIsLoading: false,
};

export default Overridable.component(
  'DocumentCirculation',
  DocumentCirculation
);
