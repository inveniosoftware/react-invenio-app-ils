import _isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Divider, Table } from 'semantic-ui-react';
import Overridable from 'react-overridable';

class DocumentConferenceCmp extends Component {
  render() {
    const { conference } = this.props;
    return (
      <Overridable id="DocumentConference.layout" conference={conference}>
        <>
          <Divider horizontal>Conference information</Divider>
          {_isEmpty(conference) && 'No conference information.'}
          {conference.map((conf) => {
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
                      <Table.Cell>Series number</Table.Cell>
                      <Table.Cell>{conf.series}</Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
                <br />
              </>
            );
          })}
        </>
      </Overridable>
    );
  }
}

DocumentConferenceCmp.propTypes = {
  conference: PropTypes.array,
};

DocumentConferenceCmp.defaultProps = {
  conference: [],
};

export const DocumentConference = Overridable.component(
  'DocumentConference',
  DocumentConferenceCmp
);
