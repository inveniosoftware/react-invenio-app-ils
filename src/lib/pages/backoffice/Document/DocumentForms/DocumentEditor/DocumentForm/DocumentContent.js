import { invenioConfig } from '@config';
import { TextField } from '@forms/core/TextField';
import React, { Component } from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import { Keywords, Subjects, TableOfContent, TagsField } from './components';

export class DocumentContent extends Component {
  render() {
    return (
      <>
        <Grid columns="equal">
          <Grid.Row>
            <Grid.Column width={11}>
              <TextField
                label="Abstract"
                fieldPath="abstract"
                rows={5}
                optimized
              />
              <Grid columns="equal">
                <Grid.Row>
                  <Grid.Column>
                    <TagsField
                      fieldPath="tags"
                      type={invenioConfig.VOCABULARIES.document.tags}
                    />
                  </Grid.Column>
                  <Grid.Column>
                    <Segment>
                      <Keywords />
                    </Segment>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Grid.Column>
            <Grid.Column width={5}>
              <Segment>
                <TableOfContent />
              </Segment>
              <Segment>
                <Subjects />
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </>
    );
  }
}
