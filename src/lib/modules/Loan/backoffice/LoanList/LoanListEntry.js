import { DocumentIcon, ItemIcon, LoanIcon } from '@components/backoffice/icons';
import DocumentAuthors from '@modules/Document/DocumentAuthors';
import LoanLinkToItem from '@modules/Loan/backoffice/LoanLinkToItem';
import { OverdueLoanSendMailModal } from '@modules/Loan/backoffice/OverdueLoanSendMailModal';
import { BackOfficeRoutes } from '@routes/urls';
import _isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Header, Item, Label, List } from 'semantic-ui-react';
import { LoanDates } from './LoanDates';
import Overridable from 'react-overridable';

export class LoanListEntry extends Component {
  render() {
    const { loan, target } = this.props;

    return (
      <Item>
        <Item.Content>
          {loan.metadata.is_overdue && <Label color="red">Overdue</Label>}
          <Item.Header
            as={Link}
            target={target}
            to={BackOfficeRoutes.loanDetailsFor(loan.metadata.pid)}
            data-test={`navigate-${loan.metadata.pid}`}
          >
            <LoanIcon /> Loan #{loan.metadata.pid}
          </Item.Header>
          <Grid columns={5}>
            <Grid.Column computer={6} largeScreen={5}>
              <label>Patron</label>{' '}
              <Link
                target="_blank"
                to={BackOfficeRoutes.patronDetailsFor(loan.metadata.patron_pid)}
              >
                {loan.metadata.patron.name}
              </Link>{' '}
              requested:
              <Item.Meta className="document-authors">
                <Header className="loan-document-title" as="h5">
                  {loan.metadata.document.title}
                </Header>
                <DocumentAuthors
                  authors={loan.metadata.document.authors}
                  hasOtherAuthors={loan.metadata.document.other_authors}
                  prefix="by "
                  limit={10}
                />
              </Item.Meta>
            </Grid.Column>
            <Grid.Column computer={3} largeScreen={3}>
              <List>
                <List.Item>
                  <List.Content floated="right">
                    {loan.metadata.state}
                  </List.Content>
                  <List.Content>
                    <label>State</label>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <LoanDates loan={loan} />
                </List.Item>
                <List.Item>
                  <List.Content floated="right">
                    {loan.metadata.extension_count || '0'}
                  </List.Content>
                  <List.Content>
                    <label> Extensions</label>
                  </List.Content>
                </List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={2} textAlign="center">
              <OverdueLoanSendMailModal loan={loan} />
              <Overridable
                id="LoanListEntry.DeliveryIcon"
                deliveryMethod={
                  loan.metadata.delivery ? loan.metadata.delivery.method : null
                }
                showName
                asListItem
                loanState={loan.metadata.state}
              />
            </Grid.Column>
            <Grid.Column computer={3} largeScreen={3}>
              {!_isEmpty(loan.metadata.item_pid) && (
                <List>
                  <List.Item>
                    <List.Content>
                      Item{' '}
                      <LoanLinkToItem itemPid={loan.metadata.item_pid}>
                        {loan.metadata.item.barcode && (
                          <>
                            <ItemIcon />
                            {loan.metadata.item.barcode}
                          </>
                        )}
                      </LoanLinkToItem>
                    </List.Content>
                    {loan.metadata.item.medium && (
                      <List.Content>
                        <label>medium</label> {loan.metadata.item.medium}
                      </List.Content>
                    )}
                  </List.Item>
                </List>
              )}
            </Grid.Column>
            <Grid.Column computer={2} largeScreen={2} textAlign="right">
              <Link
                target="_blank"
                to={BackOfficeRoutes.documentDetailsFor(
                  loan.metadata.document_pid
                )}
              >
                Document <DocumentIcon />
              </Link>
              <br />
            </Grid.Column>
          </Grid>
        </Item.Content>
        <div className="pid-field">#{loan.metadata.pid}</div>
      </Item>
    );
  }
}

LoanListEntry.propTypes = {
  loan: PropTypes.object.isRequired,
  target: PropTypes.string,
};

LoanListEntry.defaultProps = {
  target: '',
};

export default Overridable.component('LoanListEntry', LoanListEntry);
