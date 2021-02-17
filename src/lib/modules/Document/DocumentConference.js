import _isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Divider, Table } from 'semantic-ui-react';

export class DocumentConference extends Component {
  render() {
    const { conference } = this.props;
    return (
      <>
        <Divider horizontal>Conference information</Divider>
        {_isEmpty(conference) ? (
          'No conference information'
        ) : (
          <Table definition>
            <Table.Body>
              <Table.Row>
                <Table.Cell width={4}>Conference</Table.Cell>
                <Table.Cell>{conference.title}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Acronym</Table.Cell>
                <Table.Cell>{conference.acronym}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Dates</Table.Cell>
                <Table.Cell>{conference.dates}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Identifiers</Table.Cell>
                <Table.Cell>
                  {conference.identifiers &&
                    conference.identifiers.map(
                      (identifier) =>
                        '(' + identifier.scheme + ') ' + identifier.value
                    )}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Place</Table.Cell>
                <Table.Cell>{conference.place}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Series</Table.Cell>
                <Table.Cell>{conference.series}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        )}
      </>
    );
  }
}

DocumentConference.propTypes = {
  conference: PropTypes.object,
};

DocumentConference.defaultProps = {
  conference: {},
};
