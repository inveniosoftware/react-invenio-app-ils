import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Loader } from '@components/Loader';
import { Error } from '@components/Error';
import { ResultsTable } from '@components/ResultsTable/ResultsTable';
import { itemApi } from '@api/items';
import { BackOfficeRoutes } from '@routes/urls';
import { SeeAllButton } from '@components/backoffice/buttons/SeeAllButton';
import _get from 'lodash/get';
import Overridable from 'react-overridable';

class DocumentItems extends Component {
  componentDidMount() {
    const { fetchDocumentItems, documentDetails } = this.props;
    fetchDocumentItems(documentDetails.pid);
  }

  seeAllButton = () => {
    const { documentDetails } = this.props;

    const path = BackOfficeRoutes.itemsListWithQuery(
      itemApi.query().withDocPid(documentDetails.pid).qs()
    );
    return <SeeAllButton to={path} />;
  };

  viewDetails = ({ row }) => {
    return (
      <Link
        to={BackOfficeRoutes.itemDetailsFor(row.metadata.pid)}
        data-test={row.metadata.pid}
      >
        {row.metadata.barcode}
      </Link>
    );
  };

  locationFormatter = ({ row }) => {
    return `${row.metadata.internal_location.name} (${row.metadata.internal_location.location.name})`;
  };

  getColumnFormat = () => {
    return [
      {
        title: 'Barcode',
        field: 'metadata.barcode',
        formatter: this.viewDetails,
      },
      { title: 'Status', field: 'metadata.status' },
      { title: 'Medium', field: 'metadata.medium' },
      {
        title: 'Location',
        field: 'metadata.internal_location.name',
        formatter: this.locationFormatter,
      },
      { title: 'Shelf', field: 'metadata.shelf' },
      { title: 'Restrictions', field: 'metadata.circulation_restriction' },
      {
        title: 'Loan Status',
        field: 'metadata.circulation.state',
        formatter: ({ row, col }) => {
          if (_get(row, col.field) === 'ITEM_ON_LOAN') {
            return (
              <Link
                to={BackOfficeRoutes.loanDetailsFor(
                  row.metadata.circulation.loan_pid
                )}
              >
                on loan
              </Link>
            );
          }
          return _get(row, col.field) || '-';
        },
      },
    ];
  };

  renderTable(data) {
    const { showMaxItems, columnFormat } = this.props;
    const columns =
      columnFormat !== null ? columnFormat() : this.getColumnFormat();
    return (
      <ResultsTable
        data={data.hits}
        columns={columns}
        totalHitsCount={data.total}
        name="attached items"
        seeAllComponent={this.seeAllButton()}
        showMaxRows={showMaxItems}
      />
    );
  }

  render() {
    const { documentItems, isLoading, error } = this.props;
    return (
      <Loader isLoading={isLoading}>
        <Error error={error}>{this.renderTable(documentItems)}</Error>
      </Loader>
    );
  }
}

DocumentItems.propTypes = {
  documentItems: PropTypes.object.isRequired,
  documentDetails: PropTypes.object.isRequired,
  fetchDocumentItems: PropTypes.func.isRequired,
  showMaxItems: PropTypes.number,
  isLoading: PropTypes.bool,
  error: PropTypes.object,
  columnFormat: PropTypes.func,
};

DocumentItems.defaultProps = {
  showMaxItems: 5,
  isLoading: false,
  error: null,
  columnFormat: null,
};

export default Overridable.component(
  'DocumentDetails.DocumentItems',
  DocumentItems
);
