import React, { Component } from 'react';
import Overridable from 'react-overridable';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import _startCase from 'lodash/startCase';
import { Loader } from '@components/Loader';
import { Error } from '@components/Error';
import { ResultsTable } from '@components/ResultsTable/ResultsTable';
import { Pagination } from '@components/Pagination';
import { dateFormatter } from '@api/date';
import { FrontSiteRoutes } from '@routes/urls';
import { Header, Item } from 'semantic-ui-react';
import { ILSItemPlaceholder } from '@components/ILSPlaceholder/ILSPlaceholder';
import { InfoMessage } from '@components/InfoMessage';

class PatronPastDocumentRequests extends Component {
  constructor(props) {
    super(props);
    this.state = { activePage: 1 };
  }

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
      <>
        <Item.Group>
          <ILSItemPlaceholder fluid {...props} />
        </Item.Group>
      </>
    );
  };

  renderEmpty = () => {
    return (
      <InfoMessage
        title="No past requests for new literature"
        message="You have no past requests for new literature."
      />
    );
  };

  render() {
    const { data, isLoading, error } = this.props;
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
    return (
      <Overridable
        id="PatronPastDocumentRequests.layout"
        data={data}
        isLoading={isLoading}
        error={error}
        activePage={activePage}
      >
        <>
          <Header
            as="h2"
            content="Your past requests for new literature"
            className="highlight"
            textAlign="center"
          />
          <Loader isLoading={isLoading} renderElement={this.renderLoader}>
            <Error error={error}>
              <ResultsTable
                data={data.hits}
                columns={columns}
                totalHitsCount={data.total}
                title=""
                name="past literature requests"
                paginationComponent={this.paginationComponent()}
                currentPage={activePage}
                renderEmptyResultsElement={this.renderEmpty}
              />
            </Error>
          </Loader>
        </>
      </Overridable>
    );
  }
}

PatronPastDocumentRequests.propTypes = {
  patronPid: PropTypes.string.isRequired,
  fetchPatronDocumentRequests: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.object,
  showMaxRows: PropTypes.number,
};

PatronPastDocumentRequests.defaultProps = {
  error: {},
};

export default Overridable.component(
  'PatronPastDocumentRequests',
  PatronPastDocumentRequests
);
