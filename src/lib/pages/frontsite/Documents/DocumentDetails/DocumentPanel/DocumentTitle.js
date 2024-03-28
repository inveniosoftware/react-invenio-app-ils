import _isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import React, { Component } from 'react';
import { Grid, Header, Label } from 'semantic-ui-react';
import LiteratureTitle from '@modules/Literature/LiteratureTitle';
import { Media } from '@components/Media';

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
        <Media greaterThanOrEqual="tablet">
          <Grid columns={2}>
            <Grid.Row className="pb-0">
              <Grid.Column textAlign="left">
                {metadata.document_type}
              </Grid.Column>
              <Grid.Column textAlign="right">
                {volume && <Label>{'Volume ' + volume}</Label>}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Media>
        <Media lessThan="tablet">
          <Grid columns={2} textAlign="center">
            <Grid.Row className="pb-0 pt-2">{metadata.document_type}</Grid.Row>
            <Grid.Row className="pb-0">
              {volume && <Label>{'Volume ' + volume}</Label>}
            </Grid.Row>
          </Grid>
        </Media>
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
