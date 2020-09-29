import DocumentAuthors from '@modules/Document/DocumentAuthors';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Divider, Table } from 'semantic-ui-react';
import LiteratureKeywords from '@modules/Literature/LiteratureKeywords';

export class DocumentInfo extends Component {
  renderLanguages() {
    const { metadata } = this.props;
    if (metadata.languages) {
      return (
        <Table.Row>
          <Table.Cell>Languages</Table.Cell>
          <Table.Cell>{metadata.languages.join(', ')}</Table.Cell>
        </Table.Row>
      );
    }
    return null;
  }

  renderKeywords() {
    const { metadata } = this.props;
    return (
      <Table.Row>
        <Table.Cell>Keywords</Table.Cell>
        <Table.Cell>
          <LiteratureKeywords keywords={metadata.keywords} separator=", " />
        </Table.Cell>
      </Table.Row>
    );
  }

  render() {
    const { metadata } = this.props;

    return (
      <>
        <Divider horizontal>Details</Divider>
        <Table definition>
          <Table.Body>
            <Table.Row>
              <Table.Cell>Title</Table.Cell>
              <Table.Cell>{metadata.title}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Authors</Table.Cell>
              <Table.Cell>
                <DocumentAuthors
                  authors={metadata.authors}
                  hasOtherAuthors={metadata.other_authors}
                  withPopUpShowMoreFields
                  limit={20}
                  scrollLimit={300}
                  expandable
                />
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Edition</Table.Cell>
              <Table.Cell>{metadata.edition}</Table.Cell>
            </Table.Row>
            {this.renderLanguages()}
            {this.renderKeywords()}
          </Table.Body>
        </Table>
      </>
    );
  }
}

DocumentInfo.propTypes = {
  metadata: PropTypes.object.isRequired,
};
