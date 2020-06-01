import { toShortDate } from '@api/date';
import { LiteratureCover } from '@modules/Literature/LiteratureCover';
import { DocumentAuthors } from '@modules/Document/DocumentAuthors';
import { FrontSiteRoutes } from '@routes/urls';
import _get from 'lodash/get';
import _has from 'lodash/has';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Overridable from 'react-overridable';
import { Link } from 'react-router-dom';
import { Button, Grid, Icon, Item, Popup } from 'semantic-ui-react';

class LoanRequestListEntry extends Component {
  render() {
    const { loan, onCancelButton } = this.props;

    return (
      <Overridable
        id="LoanRequestListEntry.layout"
        loan={loan}
        onCancelButton={onCancelButton}
      >
        <Item key={loan.metadata.pid} data-test={loan.metadata.pid}>
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
                    <DocumentAuthors
                      metadata={loan.metadata.document}
                      authorsLimit={10}
                    />
                    Requested on {toShortDate(loan.metadata.request_start_date)}
                    <br />
                    Valid until {toShortDate(loan.metadata.request_expire_date)}
                    <Popup
                      content={
                        'If the request was not processed ' +
                        'before this date it will be invalidated'
                      }
                      trigger={<Icon name="info" />}
                    />
                  </Item.Meta>
                </Grid.Column>
                <Grid.Column
                  textAlign="right"
                  mobile={16}
                  tablet={8}
                  computer={8}
                >
                  <Item.Description>
                    {_has(loan, 'availableActions.cancel') && (
                      <Button
                        size="small"
                        onClick={e => onCancelButton(e, loan)}
                      >
                        Cancel
                      </Button>
                    )}
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

LoanRequestListEntry.propTypes = {
  loan: PropTypes.object.isRequired,
  onCancelButton: PropTypes.func.isRequired,
};

export default Overridable.component(
  'LoanRequestListEntry',
  LoanRequestListEntry
);
