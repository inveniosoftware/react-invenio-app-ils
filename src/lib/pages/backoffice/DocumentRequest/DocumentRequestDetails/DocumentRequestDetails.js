import { Error } from '@components/Error';
import { Loader } from '@components/Loader';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Container, Divider } from 'semantic-ui-react';
import { DocumentRequestActions } from './DocumentRequestActions';
import { DocumentRequestHeader } from './DocumentRequestHeader';
import { DocumentRequestMetadata } from './DocumentRequestMetadata';
import { DocumentRequestSteps } from './DocumentRequestSteps';

export default class DocumentRequestDetails extends Component {
  componentDidMount() {
    const { fetchDocumentRequestDetails, match } = this.props;
    fetchDocumentRequestDetails(match.params.documentRequestPid);
  }

  componentDidUpdate(prevProps) {
    const { fetchDocumentRequestDetails, match } = this.props;

    const documentRequestPid = match.params.documentRequestPid;
    const samePidFromRouter =
      prevProps.match.params.documentRequestPid === documentRequestPid;
    if (!samePidFromRouter) {
      fetchDocumentRequestDetails(documentRequestPid);
    }
  }

  render() {
    const { isLoading, error } = this.props;
    return (
      <Loader isLoading={isLoading}>
        <Error error={error}>
          <Container fluid className="spaced">
            <DocumentRequestHeader />
            <Divider />
            <DocumentRequestActions />
            <Divider />
          </Container>
          <Container>
            <DocumentRequestMetadata />
            <Divider />
            <DocumentRequestSteps />
          </Container>
        </Error>
      </Loader>
    );
  }
}

DocumentRequestDetails.propTypes = {
  fetchDocumentRequestDetails: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  error: PropTypes.object,
  match: PropTypes.shape({
    params: PropTypes.shape({
      documentRequestPid: PropTypes.string,
    }),
  }).isRequired,
};

DocumentRequestDetails.defaultProps = {
  isLoading: false,
  error: {},
};
