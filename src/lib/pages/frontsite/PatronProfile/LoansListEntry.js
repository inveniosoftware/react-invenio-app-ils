import LiteratureCover from '@modules/Literature/LiteratureCover';
import LiteratureTitle from '@modules/Literature/LiteratureTitle';
import { FrontSiteRoutes } from '@routes/urls';
import _get from 'lodash/get';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Overridable from 'react-overridable';
import { Link } from 'react-router-dom';
import { Grid, Icon, Item, Popup } from 'semantic-ui-react';

export default class LoansListEntry extends Component {
  render() {
    const {
      loan,
      withLinking,
      extraItemProps: {
        itemClass,
        itemHeaderCmp,
        itemMetaCmp,
        itemDescriptionCmp,
        itemExtraCmp,
      },
    } = this.props;
    const document = loan.metadata.document;
    const documentPid = document.pid;
    const documentTitle = document.title;
    const documentEdition = document.edition;
    const documentPublicationYear = document.publicationYear;
    const documentAuthors = document.authors;
    const coverUrl = _get(document, 'cover_metadata.urls.medium');
    // option links props
    const linkToProp = withLinking
      ? { linkTo: FrontSiteRoutes.documentDetailsFor(documentPid) }
      : null;
    const toProp = withLinking
      ? { as: Link, to: FrontSiteRoutes.documentDetailsFor(documentPid) }
      : null;
    const searchForLiterature = !withLinking ? (
      <Popup
        content="Search for this literature in the catalogue. Note that it may no longer be available."
        trigger={
          <div className="float-right">
            <Link
              to={FrontSiteRoutes.documentsListWithQuery(`"${documentTitle}"`)}
            >
              <Icon name="search" />
            </Link>
          </div>
        }
      />
    ) : null;
    return (
      <Overridable id="LoansListEntry.layout" {...this.props}>
        <Item className={itemClass} key={loan.pid}>
          <LiteratureCover asItem size="tiny" url={coverUrl} {...linkToProp} />
          <Item.Content>
            <Item.Header {...toProp}>
              <LiteratureTitle
                title={documentTitle}
                edition={documentEdition}
                publicationYear={documentPublicationYear}
              />
              {itemHeaderCmp}
            </Item.Header>

            {searchForLiterature}

            <Grid columns={2}>
              <Grid.Column mobile={16} tablet={8} computer={10}>
                <Item.Meta>
                  {documentAuthors}
                  {itemMetaCmp}
                </Item.Meta>
              </Grid.Column>
              <Grid.Column
                textAlign="right"
                mobile={16}
                tablet={8}
                computer={6}
              >
                <Item.Description>{itemDescriptionCmp}</Item.Description>
              </Grid.Column>
            </Grid>
            <Item.Extra>
              <div className="ui right floated">{itemExtraCmp}</div>
            </Item.Extra>
          </Item.Content>
        </Item>
      </Overridable>
    );
  }
}

LoansListEntry.propTypes = {
  loan: PropTypes.object.isRequired,
  withLinking: PropTypes.bool,
  extraItemProps: PropTypes.shape({
    itemClass: PropTypes.string,
    itemHeaderCmp: PropTypes.element,
    itemMetaCmp: PropTypes.element,
    itemDescriptionCmp: PropTypes.element,
    itemExtraCmp: PropTypes.element,
  }),
};

LoansListEntry.defaultProps = {
  withLinking: true,
  extraItemProps: {
    itemClass: null,
    itemHeaderCmp: null,
    itemMetaCmp: null,
    itemDescriptionCmp: null,
    itemExtraCmp: null,
  },
};
