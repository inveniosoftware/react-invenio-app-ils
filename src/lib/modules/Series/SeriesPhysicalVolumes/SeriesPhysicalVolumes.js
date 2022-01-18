import _isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Container, Divider } from 'semantic-ui-react';
import { ResultsTable } from '@components/ResultsTable/ResultsTable';

export class SeriesPhysicalVolumes extends Component {
  render() {
    const { physicalVolumes, header, tableClass } = this.props;
    const columns = [
      {
        title: 'Volume',
        field: 'description',
      },
      { title: 'Location', field: 'location' },
    ];

    if (_isEmpty(physicalVolumes)) return null;

    return (
      <Container fluid className={tableClass}>
        <>
          <Divider horizontal>{header}</Divider>
          <ResultsTable fixed columns={columns} data={physicalVolumes} />
        </>
      </Container>
    );
  }
}

SeriesPhysicalVolumes.propTypes = {
  physicalVolumes: PropTypes.object.isRequired,
  header: PropTypes.string,
  tableClass: PropTypes.string,
};

SeriesPhysicalVolumes.defaultProps = {
  header: 'Physical volumes',
  tableClass: '',
};
