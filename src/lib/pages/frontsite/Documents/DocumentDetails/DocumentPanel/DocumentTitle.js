import _isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Header } from 'semantic-ui-react';
import LiteratureTitle from '@modules/Literature/LiteratureTitle';

export class DocumentTitle extends Component {
  subtitle() {
    const {
      metadata: { alternative_titles },
    } = this.props;
    if (!_isEmpty(alternative_titles)) {
      const subtitle = alternative_titles.find((e) => e.type === 'SUBTITLE');
      if (!_isEmpty(subtitle)) {
        return <Header.Subheader>{subtitle.value}</Header.Subheader>;
      }
    }
  }

  render() {
    const { metadata } = this.props;
    return (
      <>
        {metadata.document_type}
        <Header as="h2" className="document-title">
          <LiteratureTitle
            title={metadata.title}
            edition={metadata.edition}
            publicationYear={metadata.publication_year}
            truncate={false}
          />
          {this.subtitle()}
        </Header>
      </>
    );
  }
}

DocumentTitle.propTypes = {
  metadata: PropTypes.object.isRequired,
};
