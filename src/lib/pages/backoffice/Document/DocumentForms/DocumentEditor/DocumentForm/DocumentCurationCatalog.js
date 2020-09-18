import { BooleanField } from '@forms/core/BooleanField';
import { TextField } from '@forms/core/TextField';
import React, { Component } from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import { InternalNotes } from './components';

export class DocumentCurationCatalog extends Component {
  render() {
    return (
      <>
        <Grid columns="equal">
          <Grid.Row>
            <Grid.Column width={11}>
              <TextField label="Notes" fieldPath="note" rows={5} optimized />
              <Segment>
                <InternalNotes />
              </Segment>
            </Grid.Column>
            <Grid.Column width={5}>
              <BooleanField
                rightLabel="Document is curated"
                fieldPath="curated"
                toggle
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </>
    );
  }
}
