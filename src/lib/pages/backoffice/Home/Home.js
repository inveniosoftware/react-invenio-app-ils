import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import {
  IdleLoansList,
  OverbookedDocumentsList,
  OverdueLoansList,
  PendingILLPatronLoanExtensions,
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
          <Grid.Column>
            <IdleLoansList />
            <OverdueLoansList />
            <RenewedLoansList />
          </Grid.Column>
          <Grid.Column>
            <OverbookedDocumentsList />
            <PendingOverdueDocumentsList />
            <PendingILLPatronLoanExtensions />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
