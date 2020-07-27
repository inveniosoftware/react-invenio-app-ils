import { ResultsTable } from '@components/ResultsTable/ResultsTable';
import { invenioConfig } from '@config';
import { BackOfficeRoutes } from '@routes/urls';
import _get from 'lodash/get';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { Header, Item, Segment } from 'semantic-ui-react';

const viewDetails = ({ row, col }) => {
  return (
    <Link
      as={Link}
      to={BackOfficeRoutes.patronDetailsFor(row.metadata.id)}
      icon="info"
    >
      {_get(row, col.field)}
    </Link>
  );
};

viewDetails.propTypes = {
  row: PropTypes.object.isRequired,
  col: PropTypes.object.isRequired,
};

export const PatronList = ({ patrons }) => {
  const columns = [
    {
      title: invenioConfig.PATRONS.patronUniqueID.label,
      field: `metadata.${invenioConfig.PATRONS.patronUniqueID.field}`,
      formatter: viewDetails,
    },
    { title: 'Name', field: 'metadata.name', formatter: viewDetails },
    { title: 'E-mail', field: 'metadata.email' },
    { title: '#ID', field: 'metadata.id' },
  ];

  return (
    <>
      <Header>Patrons</Header>
      <Segment>
        <Item.Group divided className="bo-item-search">
          <ResultsTable data={patrons} columns={columns} />
        </Item.Group>
      </Segment>
    </>
  );
};

PatronList.propTypes = {
  patrons: PropTypes.arrayOf(PropTypes.object),
};

PatronList.defaultProps = {
  patrons: [],
};
