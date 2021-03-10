import _isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Divider, Table } from 'semantic-ui-react';

export class DocumentConference extends Component {
  renderConferences = (conference) => {
    return conference.map((conf) => {
      return (
        <>
          <Table definition key={conf}>
            <Table.Body>
              <Table.Row>
                <Table.Cell width={4}>Conference</Table.Cell>
                <Table.Cell>{conf.title}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Acronym</Table.Cell>
                <Table.Cell>{conf.acronym}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Dates</Table.Cell>
                <Table.Cell>{conf.dates}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Identifiers</Table.Cell>
                <Table.Cell>
                  {conf.identifiers &&
                    conf.identifiers.map(
                      (identifier) =>
                        '(' + identifier.scheme + ') ' + identifier.value
                    )}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Place</Table.Cell>
                <Table.Cell>{conf.place}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Series</Table.Cell>
                <Table.Cell>{conf.series}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
          <br />
        </>
      );
    });
  };

  render() {
    const { conference } = this.props;
    return (
      <>
        <Divider horizontal>Conference information</Divider>
        {_isEmpty(conference)
          ? 'No conference information'
          : this.renderConferences(conference)}
      </>
    );
  }
}

DocumentConference.propTypes = {
  conference: PropTypes.array,
};

DocumentConference.defaultProps = {
  conference: [],
};
