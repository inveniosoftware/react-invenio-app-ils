import React, { Component } from 'react';
import { Divider, Grid } from 'semantic-ui-react';
import {
  IdleLoansList,
  OverbookedDocumentsList,
  OverdueLoansList,
  PendingILLPatronLoanExtensions,
  PendingNewDocumentRequests,
  PendingOverdueDocumentsList,
  RenewedLoansList,
} from './lists';
import { ACQRequestsCard, DocumentCard, ILLCard, LoansCard } from './widgets';

export default class Home extends Component {
  render() {
    return (
      <Grid>
        <Grid.Row columns={4}>
          <Grid.Column>
            <LoansCard />
          </Grid.Column>
          <Grid.Column>
            <DocumentCard />
          </Grid.Column>
          <Grid.Column>
            <ACQRequestsCard data={0} isLoading={false} />
          </Grid.Column>
          <Grid.Column>
            <ILLCard data={0} />
          </Grid.Column>
        </Grid.Row>

        <Grid.Row columns={2}>
          <Grid.Column tablet={16} computer={8}>
            <Divider hidden />
            <IdleLoansList />
            <Divider hidden />
            <OverdueLoansList />
            <Divider hidden />
            <RenewedLoansList />
          </Grid.Column>
          <Grid.Column tablet={16} computer={8}>
            <Divider hidden />
            <OverbookedDocumentsList />
            <Divider hidden />
            <PendingOverdueDocumentsList />
            <Divider hidden />
            <PendingILLPatronLoanExtensions />
            <Divider hidden />
            <PendingNewDocumentRequests />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
