import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _isEmpty from 'lodash/isEmpty';
import { DocumentCardGroup } from '@modules/Document';
import SectionServices from './SectionServices';
import { Container } from 'semantic-ui-react';
import SectionTags from './SectionTags';
import { documentApi } from '@api/documents';
import { FrontSiteRoutes } from '@routes/urls';

export default class SectionsWrapper extends Component {
  renderDefaultSections = () => {
    return (
      <Container fluid className="fs-landing-page-section-wrapper">
        <SectionServices />
        <Container fluid>
          <Container textAlign="center" className="fs-landing-page-section">
            <DocumentCardGroup
              title="Most Recent Books"
              headerClass="section-header highlight"
              fetchDataMethod={documentApi.list}
              fetchDataQuery={documentApi
                .query()
                .withDocumentType('BOOK')
                .sortBy('mostrecent')
                .qs()}
              viewAllUrl={FrontSiteRoutes.documentsListWithQuery(
                '&sort=mostrecent&order=desc'
              )}
            />
          </Container>
        </Container>
        <SectionTags />
        <Container textAlign="center" className="fs-landing-page-section">
          <DocumentCardGroup
            title="Most Loaned Books"
            headerClass="section-header highlight"
            fetchDataMethod={documentApi.list}
            fetchDataQuery={documentApi
              .query()
              .withDocumentType('BOOK')
              .sortBy('-mostloaned')
              .qs()}
            viewAllUrl={FrontSiteRoutes.documentsListWithQuery(
              '&sort=mostloaned&order=desc'
            )}
          />
        </Container>
        <Container textAlign="center" className="fs-landing-page-section">
          <DocumentCardGroup
            title="Most Recent E-Books"
            headerClass="section-header highlight"
            fetchDataMethod={documentApi.list}
            fetchDataQuery={documentApi
              .query()
              .withDocumentType('BOOK')
              .withEitems()
              .sortBy('-mostrecent')
              .qs()}
            viewAllUrl={FrontSiteRoutes.documentsListWithQuery(
              '&f=doctype%3ABOOK&f=medium%3AELECTRONIC_VERSION&sort=mostrecent&order=desc'
            )}
          />
        </Container>
      </Container>
    );
  };

  renderSections = () => {
    const { sections } = this.props;
    if (!_isEmpty(sections)) {
      return (
        <Container fluid className="fs-landing-page-section-wrapper">
          {sections.map((Section, idx) => {
            return <Section key={idx} className="fs-landing-page-section" />;
          })}
        </Container>
      );
    }
    return this.renderDefaultSections();
  };

  render() {
    return this.renderSections();
  }
}

SectionsWrapper.propTypes = {
  sections: PropTypes.array,
};

SectionsWrapper.defaultProps = {
  sections: [],
};
