import _isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Divider, Table } from 'semantic-ui-react';

export class DocumentPublicationInfo extends Component {
  render() {
    const { publications } = this.props;

    return (
      <>
        <Divider horizontal>Publication information</Divider>
        {_isEmpty(publications) ? (
          'No publication information'
        ) : (
          <>
            Published in:
            {publications.map((publication, idx) => (
              <>
                {idx > 0 && <Divider horizontal />}
                <Table definition key={publication.journal_title}>
                  <Table.Body>
                    {publication?.journal_title && (
                      <Table.Row>
                        <Table.Cell width={4}>Journal</Table.Cell>
                        <Table.Cell>{publication.journal_title}</Table.Cell>
                      </Table.Row>
                    )}
                    {publication?.journal_issue && (
                      <Table.Row>
                        <Table.Cell>Issue</Table.Cell>
                        <Table.Cell>{publication.journal_issue}</Table.Cell>
                      </Table.Row>
                    )}
                    {publication?.journal_volume && (
                      <Table.Row>
                        <Table.Cell>Volume</Table.Cell>
                        <Table.Cell>{publication.journal_volume}</Table.Cell>
                      </Table.Row>
                    )}
                    {publication?.artid && (
                      <Table.Row>
                        <Table.Cell>Article ID</Table.Cell>
                        <Table.Cell>{publication.artid}</Table.Cell>
                      </Table.Row>
                    )}
                    {publication?.pages && (
                      <Table.Row>
                        <Table.Cell>Pages</Table.Cell>
                        <Table.Cell>{publication.pages}</Table.Cell>
                      </Table.Row>
                    )}
                    {publication?.year && (
                      <Table.Row>
                        <Table.Cell>Publication year</Table.Cell>
                        <Table.Cell>{publication.year}</Table.Cell>
                      </Table.Row>
                    )}
                    {publication?.note && (
                      <Table.Row>
                        <Table.Cell>Note</Table.Cell>
                        <Table.Cell>{publication.note}</Table.Cell>
                      </Table.Row>
                    )}
                  </Table.Body>
                </Table>
              </>
            ))}
          </>
        )}
      </>
    );
  }
}

DocumentPublicationInfo.propTypes = {
  publications: PropTypes.array,
};

DocumentPublicationInfo.defaultProps = {
  publications: [],
};
