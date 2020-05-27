import { toShortDate } from '@api/date';
import { LiteratureCover } from '@modules/Literature';
import { DocumentAuthors } from '@modules/Document';
import { ExtensionCount } from '@modules/Loan';
import { FrontSiteRoutes } from '@routes/urls';
import _get from 'lodash/get';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Overridable from 'react-overridable';
import { Link } from 'react-router-dom';
import { Grid, Item, Label } from 'semantic-ui-react';

class PastLoanListEntry extends Component {
  render() {
    const { loan } = this.props;
    return (
      <Overridable id="PastLoanListEntry.layout" loan={loan}>
        <Item key={loan.metadata.pid}>
          <>
            <LiteratureCover
              asItem
              isRestricted={_get(loan, 'metadata.document.restricted', false)}
              linkTo={FrontSiteRoutes.documentDetailsFor(
                loan.metadata.document_pid
              )}
              size="tiny"
              url={_get(loan, 'metadata.document.cover_metadata.urls.medium')}
            />

            <Item.Content>
              <Item.Header
                as={Link}
                to={FrontSiteRoutes.documentDetailsFor(
                  loan.metadata.document_pid
                )}
              >
                {loan.metadata.document.title}
              </Item.Header>
              <Grid columns={2}>
                <Grid.Column mobile={16} tablet={8} computer={8}>
                  <Item.Meta>
                    <DocumentAuthors metadata={loan.metadata.document} />
                    Loaned on {toShortDate(loan.metadata.start_date)}
                  </Item.Meta>
                  <ExtensionCount count={loan.metadata.extension_count} />
                </Grid.Column>
                <Grid.Column
                  textAlign="right"
                  mobile={16}
                  tablet={8}
                  computer={8}
                >
                  <Item.Description>
                    Literature returned on{' '}
                    <Label>{toShortDate(loan.metadata.end_date)}</Label>
                  </Item.Description>
                </Grid.Column>
              </Grid>
            </Item.Content>
          </>
        </Item>
      </Overridable>
    );
  }
}

PastLoanListEntry.propTypes = {
  loan: PropTypes.object.isRequired,
};

export default Overridable.component('PastLoanListEntry', PastLoanListEntry);
