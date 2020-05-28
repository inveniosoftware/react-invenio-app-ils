import { eItemApi } from '@api';
import { Error, Loader, ResultsTable } from '@components';
import { OpenAccessLabel } from '@components/backoffice';
import { SeeAllButton } from '@components/backoffice/buttons';
import { BackOfficeRoutes } from '@routes/urls';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class DocumentEItems extends Component {
  componentDidMount() {
    const { fetchDocumentEItems, documentDetails } = this.props;
    fetchDocumentEItems(documentDetails.pid);
  }

  seeAllButton = () => {
    const { documentDetails } = this.props;
    const path = BackOfficeRoutes.eItemsListWithQuery(
      eItemApi
        .query()
        .withDocPid(documentDetails.pid)
        .qs()
    );
    return <SeeAllButton to={path} />;
  };

  viewDetails = ({ row }) => {
    return (
      <Link
        to={BackOfficeRoutes.eitemDetailsFor(row.metadata.pid)}
        data-test={row.metadata.pid}
      >
        {row.metadata.pid}
      </Link>
    );
  };

  filesFieldFormatter = ({ row }) => {
    return row.metadata.files.length;
  };

  accessFormatter = ({ row }) => {
    return (
      <OpenAccessLabel openAccess={row.metadata.open_access} size="tiny" />
    );
  };

  renderTable(data) {
    const { showMaxItems } = this.props;
    const columns = [
      {
        title: 'PID',
        field: '',
        formatter: this.viewDetails,
      },
      {
        title: 'Files',
        field: 'metadata.files',
        formatter: this.filesFieldFormatter,
      },
      {
        title: 'Access',
        field: 'metadata.open_access',
        formatter: this.accessFormatter,
      },
    ];
    return (
      <ResultsTable
        data={data.hits}
        columns={columns}
        totalHitsCount={data.total}
        name="attached e-items"
        seeAllComponent={this.seeAllButton()}
        showMaxRows={showMaxItems}
      />
    );
  }

  render() {
    const { documentEItems, isLoading, error } = this.props;
    return (
      <Loader isLoading={isLoading}>
        <Error error={error}>{this.renderTable(documentEItems)}</Error>
      </Loader>
    );
  }
}

DocumentEItems.propTypes = {
  documentEItems: PropTypes.object.isRequired,
  documentDetails: PropTypes.object.isRequired,
  fetchDocumentEItems: PropTypes.func.isRequired,
  showMaxItems: PropTypes.number,
  isLoading: PropTypes.bool,
  error: PropTypes.object,
};

DocumentEItems.defaultProps = {
  showMaxItems: 5,
  isLoading: false,
  error: null,
};
