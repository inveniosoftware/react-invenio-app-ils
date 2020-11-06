import DocumentAuthors from '@modules/Document/DocumentAuthors';
import LiteratureCover from '@modules/Literature/LiteratureCover';
import LiteratureTitle from '@modules/Literature/LiteratureTitle';
import { FrontSiteRoutes } from '@routes/urls';
import _get from 'lodash/get';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Overridable from 'react-overridable';
import { Link } from 'react-router-dom';
import { Grid, Item } from 'semantic-ui-react';

export default class LoansListEntry extends Component {
  render() {
    const {
      loan,
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
    const documentHasOtherAuthors = document.hasOtherAuthors;
    const coverUrl = _get(document, 'cover_metadata.urls.medium');
    return (
      <Overridable id="LoansListEntry.layout" {...this.props}>
        <Item className={itemClass} key={loan.pid}>
          <LiteratureCover
            asItem
            linkTo={FrontSiteRoutes.documentDetailsFor(documentPid)}
            size="tiny"
            url={coverUrl}
          />
          <Item.Content>
            <Item.Header
              as={Link}
              to={FrontSiteRoutes.documentDetailsFor(documentPid)}
            >
              <LiteratureTitle
                title={documentTitle}
                edition={documentEdition}
                publicationYear={documentPublicationYear}
              />
              {itemHeaderCmp}
            </Item.Header>

            <Grid columns={2}>
              <Grid.Column mobile={16} tablet={8} computer={10}>
                <Item.Meta>
                  <DocumentAuthors
                    authors={documentAuthors}
                    hasOtherAuthors={documentHasOtherAuthors}
                    limit={10}
                  />
                  {itemMetaCmp}
                </Item.Meta>
              </Grid.Column>
              <Grid.Column
                textAlign="right"
                mobile={16}
                tablet={8}
                computer={8}
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
  extraItemProps: PropTypes.shape({
    itemClass: PropTypes.string,
    itemHeaderCmp: PropTypes.element,
    itemMetaCmp: PropTypes.element,
    itemDescriptionCmp: PropTypes.element,
    itemExtraCmp: PropTypes.element,
  }),
};

LoansListEntry.defaultProps = {
  extraItemProps: {
    itemClass: null,
    itemHeaderCmp: null,
    itemMetaCmp: null,
    itemDescriptionCmp: null,
    itemExtraCmp: null,
  },
};
