import { MetadataTable } from '@components/backoffice/MetadataTable';
import { UrlList } from '@components/backoffice/UrlList';
import DocumentAuthors from '@modules/Document/DocumentAuthors';
import DocumentLanguages from '@modules/Document/DocumentLanguages';
import LiteratureTags from '@modules/Literature/LiteratureTags';
import { BackOfficeRoutes } from '@routes/urls';
import get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Divider, Header } from 'semantic-ui-react';
import LiteratureKeywords from '@modules/Literature/LiteratureKeywords';

export class DocumentMetadataGeneral extends Component {
  prepareGeneral = () => {
    const { document } = this.props;
    const urls = get(this.props, 'document.metadata.urls', []);

    const rows = [
      { name: 'Title', value: document.metadata.title },
      {
        name: 'Authors',
        value: (
          <DocumentAuthors
            authors={document.metadata.authors}
            hasOtherAuthors={document.metadata.other_authors}
            withPopUpShowMoreFields
            showAllFieldsInPopUp
            limit={20}
            scrollLimit={300}
            expandable
          />
        ),
      },
      { name: 'Publication year', value: document.metadata.publication_year },
      {
        name: 'Keywords',
        value: <LiteratureKeywords keywords={document.metadata.keywords} />,
      },
      {
        name: 'Tags',
        value: (
          <LiteratureTags
            isBackOffice
            size="mini"
            tags={document.metadata.tags}
          />
        ),
      },
      {
        name: 'Edition',
        value: document.metadata.edition,
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

  prepareImprintInfo = () => {
    const { document } = this.props;

    return [
      { name: 'Publisher', value: document.metadata.imprint.publisher },
      { name: 'Date', value: document.metadata.imprint.date },
      { name: 'Place', value: document.metadata.imprint.place },
      { name: 'Reprint date', value: document.metadata.imprint.reprint_date },
    ];
  };

  render() {
    const { document } = this.props;
    return (
      <Container fluid>
        <MetadataTable rows={this.prepareGeneral()} />

        {!_isEmpty(document.metadata.imprint) && (
          <>
            <Divider />
            <Header as="h3">Imprint</Header>
            <MetadataTable rows={this.prepareImprintInfo()} />
          </>
        )}
      </Container>
    );
  }
}

DocumentMetadataGeneral.propTypes = {
  document: PropTypes.object.isRequired,
};
