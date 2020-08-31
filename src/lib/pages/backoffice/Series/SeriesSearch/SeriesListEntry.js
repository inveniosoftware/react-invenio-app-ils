import DocumentLanguages from '@modules/Document/DocumentLanguages';
import LiteratureTags from '@modules/Literature/LiteratureTags';
import LiteratureCover from '@modules/Literature/LiteratureCover';
import LiteratureEdition from '@modules/Literature/LiteratureEdition';
import { SeriesAuthors } from '@modules/Series/SeriesAuthors';
import { BackOfficeRoutes } from '@routes/urls';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Header, Icon, Item, List } from 'semantic-ui-react';

export class SeriesListEntry extends Component {
  renderImage = series => (
    <LiteratureCover
      asItem
      linkTo={BackOfficeRoutes.seriesDetailsFor(series.pid)}
      size="tiny"
      url={_get(series, 'cover_metadata.urls.medium')}
    />
  );

  renderMiddleColumn = series => {
    const { renderMiddleColumn } = this.props;
    if (renderMiddleColumn) {
      return renderMiddleColumn(series);
    }
    return (
      <>
        <DocumentLanguages languages={series.metadata.languages} withLabel />
        {series.metadata.edition && (
          <>
            <br />
            <LiteratureEdition edition={series.metadata.edition} withLabel />
          </>
        )}
      </>
    );
  };

  renderRightColumn = series => {
    const { renderRightColumn } = this.props;
    if (renderRightColumn) {
      return renderRightColumn(series);
    }
    return this.renderRelations();
  };

  renderRelations = () => {
    const { record: series } = this.props;
    // create queryString to find all MM or Series related to this series
    const partOfMMQuery = _get(
      series,
      'metadata.relations.multipart_monograph',
      []
    )
      .map(rel => `pid:${rel.pid_value}`)
      .join(' OR ');
    const partOfSeriesQuery = _get(series, 'metadata.relations.serial', [])
      .map(rel => `pid:${rel.pid_value}`)
      .join(' OR ');
    return (
      <Item.Description>
        <List verticalAlign="middle" className="series-relations">
          {partOfMMQuery && (
            <List.Item>
              <List.Content floated="right">
                <Link to={BackOfficeRoutes.seriesListWithQuery(partOfMMQuery)}>
                  <Icon name="paperclip" />
                </Link>
              </List.Content>
              <List.Content>Part of multipart monograph</List.Content>
            </List.Item>
          )}
          {partOfSeriesQuery && (
            <List.Item>
              <List.Content floated="right">
                <Link
                  to={BackOfficeRoutes.seriesListWithQuery(partOfSeriesQuery)}
                >
                  <Icon name="search plus" />
                </Link>
              </List.Content>
              <List.Content>Part of serials</List.Content>
            </List.Item>
          )}
        </List>
      </Item.Description>
    );
  };

  render() {
    const { record: series } = this.props;
    const identifier = _isEmpty(series.metadata.identifiers)
      ? null
      : series.metadata.identifiers[0];
    return (
      <Item>
        {this.renderImage(series.metadata)}
        <Item.Content>
          <Header disabled size="tiny" className="document-type">
            {series.metadata.mode_of_issuance}
          </Header>
          <br />
          <Item.Header
            as={Link}
            to={BackOfficeRoutes.seriesDetailsFor(series.metadata.pid)}
            data-test={`navigate-${series.metadata.pid}`}
          >
            {series.metadata.title}
          </Item.Header>
          <Grid columns={3}>
            <Grid.Column computer={6} largeScreen={5}>
              <Item.Meta className="series-authors">
                <SeriesAuthors prefix="by " authors={series.metadata.authors} />
              </Item.Meta>
              {identifier && (
                <>
                  <label>{identifier.scheme}</label> {identifier.value}
                </>
              )}
            </Grid.Column>
            <Grid.Column computer={4} largeScreen={4}>
              {this.renderMiddleColumn(series)}
            </Grid.Column>
            <Grid.Column computer={3} largeScreen={3}>
              {this.renderRightColumn(series)}
            </Grid.Column>
          </Grid>
          <Item.Extra>
            <LiteratureTags isBackOffice tags={series.metadata.tags} />
          </Item.Extra>
        </Item.Content>
        <div className="pid-field">#{series.metadata.pid}</div>
      </Item>
    );
  }
}

SeriesListEntry.propTypes = {
  record: PropTypes.object.isRequired,
  renderMiddleColumn: PropTypes.func,
  renderRightColumn: PropTypes.func,
};

SeriesListEntry.defaultProps = {
  renderRightColumn: null,
  renderMiddleColumn: null,
};
