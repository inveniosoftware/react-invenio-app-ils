import React, { Component } from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import {
  AlternativeAbstracts,
  AlternativeIdentifiers,
  AlternativeTitles,
} from './components';

export class DocumentAdditionalInfo extends Component {
  render() {
    return (
      <Grid columns="equal">
        <Grid.Row>
          <Grid.Column width={11}>
            <Grid columns="equal">
              <Grid.Row>
                <Grid.Column>
                  <Segment>
                    <AlternativeTitles />
                  </Segment>
                </Grid.Column>
                <Grid.Column>
                  <Segment>
                    <AlternativeIdentifiers />
                  </Segment>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Grid.Column>
          <Grid.Column width={5}>
            <Segment>
              <AlternativeAbstracts />
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
