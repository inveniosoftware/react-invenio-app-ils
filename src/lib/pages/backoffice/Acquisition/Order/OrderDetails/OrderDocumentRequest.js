import { PropTypes } from 'prop-types';
import React from 'react';
import { withCancel } from '@api/utils';
import { documentRequestApi } from '@api/documentRequests/documentRequest';
import { Link } from 'react-router-dom';
import { BackOfficeRoutes } from '@routes/urls';
import { Message } from 'semantic-ui-react';
import { Loader } from '@components/Loader';

export class OrderDocumentRequest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      documentRequest: {},
      isLoading: true,
      hasError: false,
    };
  }

  componentDidMount() {
    const {
      orderId: { pid },
    } = this.props;
    this.fetchDocumentRequest(pid);
  }

  componentWillUnmount() {
    this.cancellableDocumentRequest && this.cancellableDocumentRequest.cancel();
  }

  fetchDocumentRequest = async (pid) => {
    try {
      this.cancellableDocumentRequest = withCancel(
        documentRequestApi.list(
          documentRequestApi
            .query()
            .withPhysicalItemProviderPid(pid, 'acqoid')
            .qs()
        )
      );
      const response = await this.cancellableDocumentRequest.promise;
      this.setState({
        documentRequest: response.data.hits.length
          ? response.data.hits[0]
          : null,
        hasError: false,
        isLoading: false,
      });
    } catch (error) {
      if (error !== 'UNMOUNTED') {
        this.setState({ hasError: true, isLoading: false });
      }
    }
  };

  renderResultsOrEmpty(documentRequest) {
    return documentRequest?.metadata ? (
      <Link
        to={BackOfficeRoutes.documentRequestDetailsFor(
          documentRequest.metadata.pid
        )}
      >
        {documentRequest.metadata.title}
      </Link>
    ) : (
      <>-</>
    );
  }

  renderError() {
    return (
      <Message negative>
        <Message.Content>
          Error loading the related literature request.
        </Message.Content>
      </Message>
    );
  }

  render() {
    const { documentRequest, isLoading, hasError } = this.state;
    return (
      <Loader isLoading={isLoading}>
        {hasError
          ? this.renderError()
          : this.renderResultsOrEmpty(documentRequest)}
      </Loader>
    );
  }
}

OrderDocumentRequest.propTypes = {
  orderId: PropTypes.object,
};
