import { dateFormatter } from '@api/date';
import { Error } from '@components/Error';
import { InfoMessage } from '@components/InfoMessage';
import { Loader } from '@components/Loader';
import { Pagination } from '@components/Pagination';
import { ResultsTable } from '@components/ResultsTable/ResultsTable';
import { ILSItemPlaceholder } from '@components/ILSPlaceholder/ILSPlaceholder';
import { invenioConfig, uiConfig } from '@config';
import { FrontSiteRoutes } from '@routes/urls';
import _get from 'lodash/get';
import _has from 'lodash/has';
import _startCase from 'lodash/startCase';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Overridable from 'react-overridable';
import { Link } from 'react-router-dom';
import { Button, Header, Item } from 'semantic-ui-react';
import PatronCancelModal from '../PatronCancelModal';

class PatronCurrentDocumentRequests extends Component {
  state = {
    activePage: 1,
    cancelModal: { isOpen: false, btnClasses: undefined, data: undefined },
  };

  componentDidMount() {
    const { fetchPatronDocumentRequests, patronPid } = this.props;
    fetchPatronDocumentRequests(patronPid);
  }

  onPageChange = activePage => {
    const { fetchPatronDocumentRequests, patronPid } = this.props;
    fetchPatronDocumentRequests(patronPid, {
      page: activePage,
    });
    this.setState({ activePage: activePage });
  };

  paginationComponent = () => {
    const { isLoading, data } = this.props;
    const { activePage } = this.state;
    return (
      <Pagination
        currentPage={activePage}
        loading={isLoading}
        totalResults={data.total}
        onPageChange={this.onPageChange}
      />
    );
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

  renderLoader = props => {
    return (
      <Item.Group>
        <ILSItemPlaceholder fluid {...props} />
      </Item.Group>
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

  renderCancelButton = ({ row }) => {
    return (
      <Button
        size="small"
        onClick={e =>
          this.setState({
            cancelModal: {
              isOpen: true,
              btnClasses: e.target.classList,
              data: row,
            },
          })
        }
      >
        cancel
      </Button>
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
    {
      title: 'Actions',
      field: '',
      formatter: this.renderCancelButton,
    },
  ];

  onCancelRequestClick = () => {
    const {
      cancelModal: { data: row, btnClasses },
    } = this.state;
    const {
      rejectRequest,
      fetchPatronDocumentRequests,
      patronPid,
    } = this.props;
    this.onCloseCancelModal();
    btnClasses.add('disabled');
    btnClasses.add('loading');

    rejectRequest(row.id, {
      reject_reason: invenioConfig.documentRequests.rejectTypes.userCancel,
    });

    setTimeout(() => {
      fetchPatronDocumentRequests(patronPid).then(res => {
        if (!_has(this.state, 'cancelModal.btnClasses.remove')) return;
        btnClasses.remove('disabled');
        btnClasses.remove('loading');
      });
    }, uiConfig.ES_DELAY);
  };

  onCloseCancelModal = () => {
    this.setState({ cancelModal: { isOpen: false, data: undefined } });
  };

  render() {
    const { data, isLoading, error } = this.props;
    const { activePage, cancelModal } = this.state;
    const columns = this.getColumns();
    return (
      <Overridable
        id="PatronCurrentDocumentRequests.layout"
        data={data}
        isLoading={isLoading}
        error={error}
        cancelModal={cancelModal}
        activePage={activePage}
      >
        <>
          <Header
            as="h2"
            content="Your requests for new literature"
            className="highlight"
            textAlign="center"
          />
          <Loader isLoading={isLoading} renderElement={this.renderLoader}>
            <Error error={error}>
              <ResultsTable
                unstackable
                data={data.hits}
                columns={columns}
                totalHitsCount={data.total}
                title=""
                name="book requests"
                paginationComponent={this.paginationComponent()}
                currentPage={activePage}
                renderEmptyResultsElement={this.renderNoResults}
              />
              <PatronCancelModal
                open={cancelModal.isOpen}
                headerContent="Are you sure you want to cancel your request?"
                documentTitle={_get(cancelModal.data, 'metadata.title')}
                onCloseModal={this.onCloseCancelModal}
                onCancelAction={this.onCancelRequestClick}
              />
            </Error>
          </Loader>
        </>
      </Overridable>
    );
  }
}

PatronCurrentDocumentRequests.propTypes = {
  patronPid: PropTypes.string.isRequired,
  fetchPatronDocumentRequests: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  rejectRequest: PropTypes.func.isRequired,
  error: PropTypes.object,
  showMaxRows: PropTypes.number,
};

PatronCurrentDocumentRequests.defaultProps = {
  showMaxRows: 5,
  error: {},
};

export default Overridable.component(
  'PatronCurrentDocumentRequests',
  PatronCurrentDocumentRequests
);
