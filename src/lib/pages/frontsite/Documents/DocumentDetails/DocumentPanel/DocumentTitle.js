import _isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import React, { Component } from 'react';
import { Grid, Header, Label } from 'semantic-ui-react';
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
    const volume = _get(metadata, 'relations.multipart_monograph[0].volume');

    return (
      <>
        <Grid columns={2}>
          <Grid.Row>
            <Grid.Column textAlign="left" only="tablet computer">
              {metadata.document_type}
            </Grid.Column>
            <Grid.Column textAlign="right" only="tablet computer">
              {volume && <Label>{'Volume ' + volume}</Label>}
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Grid rows={2} textAlign="center">
          <Grid.Row only="mobile">{metadata.document_type}</Grid.Row>
          <Grid.Row only="mobile">
            {volume && <Label>{'Volume ' + volume}</Label>}
          </Grid.Row>
        </Grid>
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
