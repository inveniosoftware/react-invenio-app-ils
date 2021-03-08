import _isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Container, Divider } from 'semantic-ui-react';
import { ResultsTable } from '@components/ResultsTable/ResultsTable';

export class SeriesPhysicalVolumes extends Component {
  render() {
    const { physicalVolumes } = this.props;
    const columns = [
      {
        title: 'Description',
        field: 'description',
      },
      { title: 'Location', field: 'location' },
    ];

    if (_isEmpty(physicalVolumes)) return null;

    return (
      <Container fluid className="series-metadata">
        <>
          <Divider horizontal>Physical volumes</Divider>
          <ResultsTable fixed columns={columns} data={physicalVolumes} />
        </>
      </Container>
    );
  }
}

SeriesPhysicalVolumes.propTypes = {
  physicalVolumes: PropTypes.object.isRequired,
};
