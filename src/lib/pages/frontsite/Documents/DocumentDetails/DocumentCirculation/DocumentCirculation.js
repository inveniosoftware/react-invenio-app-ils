import { RedirectToLoginButton } from '@authentication/components';
import { AuthenticationGuard } from '@authentication/components/AuthenticationGuard';
import { ILSImagePlaceholder } from '@components/ILSPlaceholder';
import Overridable from 'react-overridable';
import { LoanAvailability } from './LoanAvailability';
import { DocumentEItems } from './DocumentEItems';

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Header, List, Segment } from 'semantic-ui-react';
import { LoanRequestForm } from '../LoanRequestForm';
import _isEmpty from 'lodash/isEmpty';

class DocumentCirculation extends Component {
  loginToLoan = () => {
    return <RedirectToLoginButton content="Sign in to loan" fluid positive />;
  };

  renderLoanRequestForm = () => {
    const { documentDetails } = this.props;
    return <LoanRequestForm document={documentDetails} />;
  };

  render() {
    const {
      documentDetails,
      isLoading,
      loanRequestIsLoading,
      showTab,
    } = this.props;
    return (
      <Segment
        loading={loanRequestIsLoading}
        className="highlighted fs-segment-transparent"
      >
        <ILSImagePlaceholder style={{ height: 400 }} isLoading={isLoading}>
          <DocumentEItems
            eitems={documentDetails.metadata.eitems}
            showTab={showTab}
          />
          <Header as="h3" content="Request loan" />
          <List>
            {!_isEmpty(documentDetails.metadata.circulation) && (
              <LoanAvailability
                circulation={documentDetails.metadata.circulation}
              />
            )}
          </List>
          <AuthenticationGuard
            authorizedComponent={this.renderLoanRequestForm}
            loginComponent={this.loginToLoan}
          />
        </ILSImagePlaceholder>
      </Segment>
    );
  }
}

DocumentCirculation.propTypes = {
  documentDetails: PropTypes.object.isRequired,
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
