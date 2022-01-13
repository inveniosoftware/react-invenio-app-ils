import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Divider, Table } from 'semantic-ui-react';

export class PhysicalVolumes extends Component {
  render() {
    const { metadata } = this.props;
    return (
      <Container>
        <Divider horizontal>Physical Volumes</Divider>
        <Table stackable striped compact fixed className="document-item-table">
          <Table.Header>
            <Table.Row data-test="header">
              <Table.HeaderCell>Description</Table.HeaderCell>
              <Table.HeaderCell>Location</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {metadata.physical_volumes.map((volume, key) => (
              <Table.Row key={key}>
                <Table.Cell
                  data-label="description"
                  className="document-item-table-itemCell"
                >
                  {volume.description}
                </Table.Cell>

                <Table.Cell
                  data-label="location"
                  className="document-item-table-itemCell"
                >
                  {volume.location}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Container>
    );
  }
}

PhysicalVolumes.propTypes = {
  metadata: PropTypes.object.isRequired,
};
