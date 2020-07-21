import { Header } from 'semantic-ui-react';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _isEmpty from 'lodash/isEmpty';

export class DocumentTitle extends Component {
  subtitle() {
    const {
      metadata: { alternative_titles },
    } = this.props;
    if (!_isEmpty(alternative_titles)) {
      const subtitle = alternative_titles.find(e => e.type === 'SUBTITLE');
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
          {metadata.title}
          {this.subtitle()}
        </Header>
      </>
    );
  }
}

DocumentTitle.propTypes = {
  metadata: PropTypes.object.isRequired,
};
