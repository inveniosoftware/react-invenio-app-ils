import { itemApi } from '@api/items';
import { Error } from '@components/Error';
import { Loader } from '@components/Loader';
import { ResultsTable } from '@components/ResultsTable/ResultsTable';
import { goTo } from '@history';
import { NewButton } from '@components/backoffice/buttons/NewButton';
import { BackOfficeRoutes } from '@routes/urls';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import { DeleteRecordModal } from '@components/backoffice/DeleteRecordModal';

export default class InternalLocationList extends Component {
  componentDidMount() {
    const { fetchInternalLocations } = this.props;
    fetchInternalLocations();
  }

  handleOnRefClick(itemPid) {
    goTo(BackOfficeRoutes.itemEditFor(itemPid));
  }

  createRefProps(ilocPid) {
    return [
      {
        refType: 'Item',
        onRefClick: this.handleOnRefClick,
        getRefData: () => itemApi.list(`internal_location_pid:${ilocPid}`),
      },
    ];
  }

  rowActions = ({ row }) => {
    const { deleteInternalLocation } = this.props;
    return (
      <>
        <Button
          as={Link}
          to={BackOfficeRoutes.ilocationsEditFor(row.metadata.pid)}
          icon="edit"
          size="small"
          title="Edit Record"
        />
        <DeleteRecordModal
          refProps={this.createRefProps(row.metadata.pid)}
          onDelete={() => deleteInternalLocation(row.metadata.pid)}
          deleteHeader={`Are you sure you want to delete the Internal Location
          record with ID ${row.metadata.pid}?`}
        />
      </>
    );
  };

  renderResults(data) {
    const headerActionComponent = (
      <NewButton
        text="New internal location"
        to={BackOfficeRoutes.ilocationsCreate}
      />
    );

    const columns = [
      { title: 'ID', field: 'metadata.pid' },
      { title: 'Location', field: 'metadata.location.name' },
      { title: 'Name', field: 'metadata.name' },
      { title: 'Physical location', field: 'metadata.physical_location' },
      { title: 'Location e-mail', field: 'metadata.location.email' },
      {
        title: 'Restricted access',
        formatter: ({ row }) =>
          row.metadata.restricted ? <i className="check icon" /> : null,
      },
      { title: 'Actions', field: '', formatter: this.rowActions },
    ];

    return (
      <ResultsTable
        data={data.hits}
        columns={columns}
        totalHitsCount={data.total}
        showAllResults
        title="Internal Locations"
        name="internal locations"
        headerActionComponent={headerActionComponent}
      />
    );
  }

  render() {
    let { data, error, isLoading } = this.props;
    return (
      <Loader isLoading={isLoading}>
        <Error error={error}>{this.renderResults(data)}</Error>
      </Loader>
    );
  }
}

InternalLocationList.propTypes = {
  data: PropTypes.object.isRequired,
  fetchInternalLocations: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.object,
  deleteInternalLocation: PropTypes.func.isRequired,
};

InternalLocationList.defaultProps = {
  error: null,
};
