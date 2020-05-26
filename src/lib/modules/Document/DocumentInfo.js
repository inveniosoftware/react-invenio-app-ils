import { DocumentAuthors } from '@modules/Document';
import _get from 'lodash/get';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Divider, Table } from 'semantic-ui-react';
import { IdentifierRows } from '../Identifiers';

export class DocumentInfo extends Component {
  renderLanguages() {
    const { metadata } = this.props;
    if (metadata.languages) {
      return (
        <Table.Row>
          <Table.Cell>Languages</Table.Cell>
          <Table.Cell>{metadata.languages.map(lang => lang + ', ')}</Table.Cell>
        </Table.Row>
      );
    }
    return null;
  }

  renderKeywords() {
    const { metadata } = this.props;

    const keywordsValue = _get(metadata, 'keywords.value');
    const keywordsSource = _get(metadata, 'keywords.source');
    const keywords =
      keywordsValue && keywordsSource
        ? `${keywordsValue} (${keywordsSource})`
        : keywordsValue
        ? keywordsValue
        : '';
    return keywords ? (
      <Table.Row>
        <Table.Cell>Keywords</Table.Cell>
        <Table.Cell>{keywords}</Table.Cell>
      </Table.Row>
    ) : null;
  }

  renderSpecificIdentifiers(scheme) {
    const { metadata } = this.props;

    const identifiers = metadata.identifiers
      ? metadata.identifiers.filter(identifier => identifier.scheme === scheme)
      : [];

    if (identifiers.length > 0) {
      return <IdentifierRows identifiers={identifiers} />;
    }
    return null;
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
                <DocumentAuthors metadata={metadata} />
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Edition</Table.Cell>
              <Table.Cell>{metadata.edition}</Table.Cell>
            </Table.Row>
            {this.renderLanguages()}
            {this.renderKeywords()}
            {this.renderSpecificIdentifiers('ISBN')}
            {this.renderSpecificIdentifiers('DOI')}
          </Table.Body>
        </Table>
      </>
    );
  }
}

DocumentInfo.propTypes = {
  metadata: PropTypes.object.isRequired,
};
