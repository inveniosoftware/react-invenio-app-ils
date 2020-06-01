import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { Loader } from '@components/Loader';
import { Error } from '@components/Error';
import { documentApi } from '@api/documents';
import { BackOfficeRoutes } from '@routes/urls';
import { SeeAllButton } from '@components/backoffice/buttons/SeeAllButton';

export default class OverbookedDocumentsList extends Component {
  componentDidMount() {
    const { fetchOverbookedDocuments } = this.props;
    fetchOverbookedDocuments();
  }

  seeAllButton = () => {
    const path = BackOfficeRoutes.documentsListWithQuery(
      documentApi
        .query()
        .overbooked()
        .qs()
    );

    return <SeeAllButton to={path} />;
  };

  viewDetails = ({ row }) => {
    return (
      <Button
        as={Link}
        to={BackOfficeRoutes.documentDetailsFor(row.metadata.pid)}
        compact
        icon="info"
        data-test={row.metadata.pid}
      />
    );
  };

  renderTable(data) {
    const { showMaxEntries } = this.props;
    const columns = [
      { title: '', field: '', formatter: this.viewDetails },
      { title: 'ID', field: 'metadata.pid' },
      { title: 'Title', field: 'metadata.title' },
      {
        title: 'Pending Requests',
        field: 'metadata.circulation.pending_loans',
      },
    ];
    return (
      <ResultsTable
        data={data.hits}
        columns={columns}
        totalHitsCount={data.total}
        title="Overbooked documents"
        subtitle="Documents with more requests than the number of available items for loan."
        name="overbooked documents"
        seeAllComponent={this.seeAllButton()}
        showMaxRows={showMaxEntries}
        singleLine
      />
    );
  }

  render() {
    const { data, isLoading, error } = this.props;
    return (
      <Loader isLoading={isLoading}>
        <Error error={error}>{this.renderTable(data)}</Error>
      </Loader>
    );
  }
}

OverbookedDocumentsList.propTypes = {
  showMaxEntries: PropTypes.number,
  /* redux */
  fetchOverbookedDocuments: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  isLoading: PropTypes.bool,
  error: PropTypes.object,
};

OverbookedDocumentsList.defaultProps = {
  showMaxEntries: 5,
  isLoading: false,
  error: {},
};
