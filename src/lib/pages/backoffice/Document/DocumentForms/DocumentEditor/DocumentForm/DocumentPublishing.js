import React, { Component } from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import {
  ConferenceInfoField,
  Imprint,
  PublicationInfoField,
} from './components';

export class DocumentPublishing extends Component {
  render() {
    return (
      <Grid columns="equal">
        <Grid.Row>
          <Grid.Column width={11}>
            <Grid columns="equal">
              <Grid.Row>
                <Grid.Column>
                  <Segment>
                    <Imprint />
                  </Segment>
                </Grid.Column>
                <Grid.Column>
                  <Segment>
                    <PublicationInfoField />
                  </Segment>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Grid.Column>
          <Grid.Column width={5}>
            <Segment>
              <ConferenceInfoField />
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
