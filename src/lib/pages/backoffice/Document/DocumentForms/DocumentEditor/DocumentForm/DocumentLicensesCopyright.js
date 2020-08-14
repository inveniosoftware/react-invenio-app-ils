import React, { Component } from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import { Copyrights, LicensesField } from './components';

export class DocumentLicensesCopyright extends Component {
  render() {
    return (
      <>
        <Grid columns="equal">
          <Grid.Row>
            <Grid.Column width={11}>
              <Segment>
                <Copyrights />
              </Segment>
            </Grid.Column>
            <Grid.Column width={5}>
              <Segment>
                <LicensesField fieldPath="licenses" />
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </>
    );
  }
}
