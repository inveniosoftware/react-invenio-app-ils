import { dateFormatter } from '@api/date';
import { Error } from '@components/Error';
import { ILSItemPlaceholder } from '@components/ILSPlaceholder/ILSPlaceholder';
import { InfoMessage } from '@components/InfoMessage';
import { PatronPagination } from '../PatronPagination';
import { Pagination } from '@components/Pagination';
import { ResultsTable } from '@components/ResultsTable/ResultsTable';
import LiteratureTitle from '@modules/Literature/LiteratureTitle';
import { FrontSiteRoutes } from '@routes/urls';
import _startCase from 'lodash/startCase';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Overridable from 'react-overridable';
import { Link } from 'react-router-dom';
import { Header } from 'semantic-ui-react';

class PatronPastDocumentRequests extends Component {
  constructor(props) {
    super(props);
    this.state = { activePage: 1 };
  }

  componentDidMount() {
    this.fetchPatronPastDocumentRequests();
  }

  fetchPatronPastDocumentRequests() {
    const { fetchPatronPastDocumentRequests, patronPid, rowsPerPage } =
      this.props;
    const { activePage } = this.state;
    fetchPatronPastDocumentRequests(patronPid, {
      page: activePage,
      size: rowsPerPage,
    });
  }

  onPageChange = (newPage) => {
    this.setState(
      { activePage: newPage },
      this.fetchPatronPastDocumentRequests
    );
  };

  paginationComponent = () => {
    const { isLoading, documentRequests, rowsPerPage } = this.props;
    const { activePage } = this.state;
    return (
      <Pagination
        currentPage={activePage}
        currentSize={rowsPerPage}
        loading={isLoading}
        totalResults={documentRequests.total}
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
        <LiteratureTitle title={row.metadata.document.title} />
      </Link>
    );
  };

  renderNoResults = () => {
    return (
      <InfoMessage
        title="No past requests for new literature"
        message="You have no past requests for new literature."
      />
    );
  };

  render() {
    const { documentRequests, isLoading, error, rowsPerPage } = this.props;
    const { activePage } = this.state;
    const columns = [
      { title: 'ID', field: 'metadata.pid' },
      { title: 'Title', field: 'metadata.title' },
      {
        title: 'Library Book',
        field: 'metadata.state',
        formatter: this.libraryBookFormatter,
      },
      { title: 'Created', field: 'created', formatter: dateFormatter },
    ];
    const headerTitle = `Your past requests for new literature (${documentRequests.total})`;
    return (
      <Overridable
        id="PatronPastDocumentRequests.layout"
        data={documentRequests}
        isLoading={isLoading}
        error={error}
        activePage={activePage}
      >
        <>
          <Header
            as="h2"
            content={headerTitle}
            className="highlight"
            textAlign="center"
          />
          <ILSItemPlaceholder fluid isLoading={isLoading}>
            <Error error={error}>
              <PatronPagination
                currentPage={activePage}
                currentSize={rowsPerPage}
                loading={isLoading}
                onPageChange={this.onPageChange}
                items={documentRequests}
              />
              <ResultsTable
                data={documentRequests.hits}
                columns={columns}
                totalHitsCount={documentRequests.total}
                title=""
                name="past literature requests"
                currentPage={activePage}
                renderEmptyResultsElement={this.renderNoResults}
                showAllResults
              />
              <PatronPagination
                currentPage={activePage}
                currentSize={rowsPerPage}
                loading={isLoading}
                onPageChange={this.onPageChange}
                items={documentRequests}
              />
            </Error>
          </ILSItemPlaceholder>
        </>
      </Overridable>
    );
  }
}

PatronPastDocumentRequests.propTypes = {
  patronPid: PropTypes.string.isRequired,
  rowsPerPage: PropTypes.number,
  /* REDUX */
  documentRequests: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.object.isRequired,
  fetchPatronPastDocumentRequests: PropTypes.func.isRequired,
};

PatronPastDocumentRequests.defaultProps = {
  rowsPerPage: 5,
};

export default Overridable.component(
  'PatronPastDocumentRequests',
  PatronPastDocumentRequests
);
