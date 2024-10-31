import { DocumentIcon, ItemIcon, LoanIcon } from '@components/backoffice/icons';
import LoanLinkToItem from '@modules/Loan/backoffice/LoanLinkToItem';

import { BackOfficeRoutes } from '@routes/urls';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Overridable from 'react-overridable';
import { Link } from 'react-router-dom';
import { Grid, Header, Item, Label, List, Icon } from 'semantic-ui-react';
import LiteratureTitle from '../../../Literature/LiteratureTitle';
import { LoanDates } from './LoanDates';
import { invenioConfig } from '@config';

export class LoanListEntry extends Component {
  render() {
    const { record: loan, target } = this.props;
    const patronPid = loan.metadata.patron_pid;
    const delivery = _get(loan.metadata.delivery, 'method');
    const deliveryMethod =
      delivery && loan.metadata.state === 'PENDING'
        ? invenioConfig.CIRCULATION.deliveryMethods[delivery]
        : '';
    const isSelfCheckout = delivery === 'SELF-CHECKOUT';
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
              {patronPid > 0 ? (
                <Link
                  target="_blank"
                  to={BackOfficeRoutes.patronDetailsFor(patronPid)}
                >
                  {loan.metadata.patron.name}
                </Link>
              ) : (
                loan.metadata.patron.name
              )}{' '}
              requested:
              <Item.Meta className="document-authors">
                <Header className="loan-document-title" as="h5">
                  <LiteratureTitle title={loan.metadata.document.title} />
                </Header>
                {`by ${loan.metadata.document.authors}`}
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
              {deliveryMethod ? (
                <>
                  {delivery}{' '}
                  {deliveryMethod.iconClass && (
                    <Icon className={deliveryMethod.iconClass} />
                  )}
                </>
              ) : (
                isSelfCheckout && (
                  <>
                    {delivery}{' '}
                    <Icon
                      className={
                        invenioConfig.CIRCULATION.deliveryMethodSelfCheckout[
                          delivery
                        ].iconClass
                      }
                    />
                  </>
                )
              )}
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
  record: PropTypes.object.isRequired,
  target: PropTypes.string,
};

LoanListEntry.defaultProps = {
  target: '',
};

export default Overridable.component('LoanListEntry', LoanListEntry);
