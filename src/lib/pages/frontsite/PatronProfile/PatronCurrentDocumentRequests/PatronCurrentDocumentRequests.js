import { dateFormatter } from '@api/date';
import { documentRequestApi } from '@api/documentRequests';
import { delay, withCancel } from '@api/utils';
import { Error } from '@components/Error';
import { ILSItemPlaceholder } from '@components/ILSPlaceholder/ILSPlaceholder';
import { InfoMessage } from '@components/InfoMessage';
import { Pagination } from '@components/Pagination';
import { ResultsTable } from '@components/ResultsTable/ResultsTable';
import { invenioConfig } from '@config';
import { FrontSiteRoutes } from '@routes/urls';
import _startCase from 'lodash/startCase';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Overridable from 'react-overridable';
import { Link } from 'react-router-dom';
import {
  Button,
  Container,
  Grid,
  Header,
  Message,
  Popup,
} from 'semantic-ui-react';
import PatronCancelModal from '../PatronCancelModal';

class ButtonCancelRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      cancelModalIsOpened: false,
      cancelModalData: {},
      errorMsgOpened: false,
      errorMsg: '',
    };
  }

  componentWillUnmount() {
    this.cancellableCancelRequest && this.cancellableCancelRequest.cancel();
  }

  openModal = (docReqPid, docReqTitle) => {
    this.setState({
      isLoading: true,
      cancelModalIsOpened: true,
      cancelModalData: {
        docReqPid: docReqPid,
        docReqTitle: docReqTitle,
      },
    });
  };

  closeCancelModal = () => {
    this.setState({
      isLoading: false,
      cancelModalIsOpened: false,
      cancelModalData: {},
    });
  };

  async cancelRequest(docReqPid) {
    const response = await documentRequestApi.reject(docReqPid, {
      reject_reason: invenioConfig.documentRequests.rejectTypes.userCancel,
    });
    await delay();
    return response;
  }

  triggerCancelRequest = async ({ docReqPid, docReqTitle }) => {
    const { onSuccess } = this.props;
    this.setState({
      isLoading: true,
      cancelModalIsOpened: false,
      cancelModalData: {},
    });

    try {
      this.cancellableCancelRequest = withCancel(this.cancelRequest(docReqPid));
      await this.cancellableCancelRequest.promise;
      this.setState({ isLoading: false });
      onSuccess(`Your request for ${docReqTitle} has been cancelled.`);
    } catch (error) {
      this.setState({ isLoading: false });
      this.showError(error.response.data.message);
    }
  };

  showError = msg => {
    this.setState({
      errorMsgOpened: true,
      errorMsg: (
        <Message negative>
          <Message.Header>Request failed!</Message.Header>
          {msg}
        </Message>
      ),
    });
  };

  hideError = () => {
    this.setState({
      errorMsgOpened: false,
      errorMsg: '',
    });
  };

  render() {
    const { docReqPid, docReqTitle } = this.props;
    const {
      isLoading,
      cancelModalIsOpened,
      cancelModalData,
      errorMsgOpened,
      errorMsg,
    } = this.state;
    return (
      <>
        <Popup
          trigger={
            <Button
              size="small"
              content="Cancel request"
              loading={isLoading}
              disabled={isLoading}
              onClick={() => this.openModal(docReqPid, docReqTitle)}
            />
          }
          content={errorMsg}
          position="top center"
          open={errorMsgOpened}
          wide
          onClick={this.hideError}
        />
        <PatronCancelModal
          isOpened={cancelModalIsOpened}
          data={cancelModalData}
          headerContent="Are you sure you want to cancel your request?"
          documentTitle={cancelModalData.docReqTitle || ''}
          onClose={this.closeCancelModal}
          onConfirm={this.triggerCancelRequest}
        />
      </>
    );
  }
}

ButtonCancelRequest.propTypes = {
  docReqPid: PropTypes.string.isRequired,
  docReqTitle: PropTypes.string.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

class PatronCurrentDocumentRequests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      isSuccessMessageVisible: false,
      successMessage: '',
    };
  }

  componentDidMount() {
    this.fetchPatronDocumentRequests();
  }

  fetchPatronDocumentRequests() {
    const { fetchPatronDocumentRequests, patronPid, rowsPerPage } = this.props;
    const { activePage } = this.state;
    fetchPatronDocumentRequests(patronPid, {
      page: activePage,
      size: rowsPerPage,
    });
  }

  onPageChange = newPage => {
    this.setState({ activePage: newPage }, this.fetchPatronDocumentRequests);
  };

  libraryBookFormatter = ({ row }) => {
    if (row.metadata.state !== 'ACCEPTED') {
      return _startCase(row.metadata.state.toLowerCase());
    }
    return (
      <Link to={FrontSiteRoutes.documentDetailsFor(row.metadata.document_pid)}>
        {row.metadata.document.title}
      </Link>
    );
  };

  renderNoResults = () => {
    return (
      <InfoMessage
        title="No requests for new literature"
        message="You do not currently have any request for new literature."
      />
    );
  };

  getColumns = () => [
    { title: 'Title', field: 'metadata.title' },
    {
      title: 'Request state',
      field: 'metadata.state',
      formatter: this.libraryBookFormatter,
    },
    { title: 'Created', field: 'created', formatter: dateFormatter },
    { title: 'Authors', field: 'metadata.authors' },
    { title: 'Publication year', field: 'metadata.publication_year' },
    { title: 'Medium', field: 'metadata.medium' },
    { title: 'Request type', field: 'metadata.request_type' },
    {
      title: 'Actions',
      field: '',
      formatter: ({ row }) => (
        <ButtonCancelRequest
          docReqPid={row.metadata.pid}
          docReqTitle={row.metadata.title}
          onSuccess={msg => {
            this.fetchPatronDocumentRequests();
            this.showSuccessMessage(msg);
          }}
        />
      ),
    },
  ];

  showSuccessMessage = msg => {
    this.setState({ isSuccessMessageVisible: true, successMessage: msg });
  };

  hideSuccessMessage = () => {
    this.setState({ isSuccessMessageVisible: false, successMessage: '' });
  };

  render() {
    const { documentRequests, isLoading, error, rowsPerPage } = this.props;
    const { activePage, isSuccessMessageVisible, successMessage } = this.state;
    const columns = this.getColumns();
    return (
      <Overridable
        id="PatronCurrentDocumentRequests.layout"
        documentRequests={documentRequests}
        isLoading={isLoading}
        error={error}
        activePage={activePage}
      >
        <>
          <Header
            as="h2"
            content="Your requests for new literature"
            className="highlight"
            textAlign="center"
          />
          {isSuccessMessageVisible && (
            <Grid columns="3">
              <Grid.Column width="4" />
              <Grid.Column width="8">
                <Message
                  positive
                  icon="check"
                  header="Success"
                  content={successMessage}
                  onDismiss={this.hideSuccessMessage}
                />
              </Grid.Column>
              <Grid.Column width="4" />
            </Grid>
          )}
          <ILSItemPlaceholder fluid isLoading={isLoading}>
            <Error error={error}>
              <ResultsTable
                unstackable
                data={documentRequests.hits}
                columns={columns}
                totalHitsCount={documentRequests.total}
                title=""
                name="requests for new literature"
                currentPage={activePage}
                renderEmptyResultsElement={this.renderNoResults}
              />
              <Container textAlign="center">
                <Pagination
                  currentPage={activePage}
                  currentSize={rowsPerPage}
                  loading={isLoading}
                  onPageChange={this.onPageChange}
                  totalResults={documentRequests.total}
                />
              </Container>
            </Error>
          </ILSItemPlaceholder>
        </>
      </Overridable>
    );
  }
}

PatronCurrentDocumentRequests.propTypes = {
  patronPid: PropTypes.string.isRequired,
  rowsPerPage: PropTypes.number,
  /* REDUX */
  documentRequests: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.object.isRequired,
  fetchPatronDocumentRequests: PropTypes.func.isRequired,
};

PatronCurrentDocumentRequests.defaultProps = {
  rowsPerPage: 5,
};

export default Overridable.component(
  'PatronCurrentDocumentRequests',
  PatronCurrentDocumentRequests
);
