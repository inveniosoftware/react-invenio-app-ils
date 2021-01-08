import { MetadataTable } from '@components/backoffice/MetadataTable';
import { UrlList } from '@components/backoffice/UrlList';
import DocumentAuthors from '@modules/Document/DocumentAuthors';
import DocumentLanguages from '@modules/Document/DocumentLanguages';
import { BackOfficeRoutes } from '@routes/urls';
import get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Divider } from 'semantic-ui-react';
import { groupedSchemeValueList } from '@components/backoffice/utils';
import { invenioConfig } from '@config';

export class DocumentMetadataGeneral extends Component {
  prepareGeneral = () => {
    const { document } = this.props;
    const urls = get(this.props, 'document.metadata.urls', []);

    const rows = [
      { name: 'Title', value: document.metadata.title },
      { name: 'Publication year', value: document.metadata.publication_year },
      {
        name: 'Edition',
        value: document.metadata.edition,
      },
      { name: 'Number of pages', value: document.metadata.number_of_pages },
      {
        name: 'Authors',
        value: (
          <DocumentAuthors
            authors={document.metadata.authors}
            hasOtherAuthors={document.metadata.other_authors}
            withPopUpShowMoreFields
            showAllFieldsInPopUp
            limit={invenioConfig.LITERATURE.authors.maxDisplay}
            scrollLimit={300}
            expandable
            withVerticalScroll
          />
        ),
      },
      {
        name: 'Languages',
        value: <DocumentLanguages languages={document.metadata.languages} />,
      },
      {
        name: 'Urls',
        value: <UrlList urls={urls} />,
      },
    ];

    const request = document.metadata.request;
    if (!_isEmpty(request)) {
      rows.push({
        name: 'Document Request',
        value: (
          <Link to={BackOfficeRoutes.documentRequestDetailsFor(request.pid)}>
            {request.state}
          </Link>
        ),
      });
    }
    return rows;
  };

  render() {
    const { document } = this.props;
    const identifiers = groupedSchemeValueList(document.metadata.identifiers);
    const alternativeIdentifiers = groupedSchemeValueList(
      document.metadata.alternative_identifiers
    );
    return (
      <Container fluid>
        <MetadataTable rows={this.prepareGeneral()} />

        {(!_isEmpty(document.metadata.identifiers) ||
          !_isEmpty(document.metadata.alternative_identifiers)) && (
          <>
            <Divider horizontal>Identifiers</Divider>
            <MetadataTable rows={identifiers.concat(alternativeIdentifiers)} />
          </>
        )}
      </Container>
    );
  }
}

DocumentMetadataGeneral.propTypes = {
  document: PropTypes.object.isRequired,
};
