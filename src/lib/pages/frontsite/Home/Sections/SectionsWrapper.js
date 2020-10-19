import { documentApi } from '@api/documents';
import { DocumentCardGroup } from '@modules/Document/DocumentCardGroup';
import { FrontSiteRoutes } from '@routes/urls';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import { SectionInstallation } from './SectionInstallation';
import { SectionServices } from './SectionServices';
import SectionTags from './SectionTags';

export default class SectionsWrapper extends Component {
  render() {
    const { size } = this.props;
    return (
      <Container fluid className="fs-landing-page-section-wrapper">
        <SectionServices />
        <SectionInstallation />
        <Container fluid>
          <Container textAlign="center" className="fs-landing-page-section">
            <DocumentCardGroup
              title="Most Recent Books"
              headerClass="section-header highlight"
              fetchDataMethod={documentApi.list}
              fetchDataQuery={documentApi
                .query()
                .withDocumentType('BOOK')
                .sortBy('-created')
                .withSize(size)
                .qs()}
              viewAllUrl={FrontSiteRoutes.documentsListWithQuery(
                '&sort=created&order=desc'
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
              .withSize(size)
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
              .sortBy('-created')
              .withSize(size)
              .qs()}
            viewAllUrl={FrontSiteRoutes.documentsListWithQuery(
              '&f=doctype%3ABOOK&f=medium%3AELECTRONIC_VERSION&sort=created&order=desc'
            )}
          />
        </Container>
      </Container>
    );
  }
}

SectionsWrapper.propTypes = {
  size: PropTypes.number,
};

SectionsWrapper.defaultProps = {
  size: 5,
};
