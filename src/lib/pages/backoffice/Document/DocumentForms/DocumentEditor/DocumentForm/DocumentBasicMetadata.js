import { invenioConfig } from '@config';
import { UrlsField } from '@forms/components';
import { BooleanField } from '@forms/core/BooleanField';
import { GroupField } from '@forms/core/GroupField';
import { SelectField } from '@forms/core/SelectField';
import { StringField } from '@forms/core/StringField';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Grid, Header, Segment } from 'semantic-ui-react';
import { AuthorsField, Identifiers } from './components';

export class DocumentBasicMetadata extends Component {
  render() {
    const { isCreate } = this.props;
    return (
      <>
        <Grid columns="equal">
          <Grid.Row>
            <Grid.Column width={11}>
              <StringField label="Title" fieldPath="title" required optimized />
              <Grid stretched columns="equal">
                <Grid.Row className="no-padding ">
                  <Grid.Column width={8}>
                    <GroupField widths="equal">
                      <StringField
                        label="Publication year"
                        fieldPath="publication_year"
                        required
                        optimized
                        width={5}
                      />
                      <StringField
                        label="Edition"
                        fieldPath="edition"
                        optimized
                        width={5}
                      />
                    </GroupField>
                  </Grid.Column>
                  <Grid.Column width={5} floated="right">
                    <SelectField
                      floated="right"
                      options={invenioConfig.DOCUMENTS.types}
                      fieldPath="document_type"
                      label="Literature types"
                      required
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column width={8}>
                    <GroupField widths="equal">
                      <StringField
                        label="Source of the metadata"
                        fieldPath="source"
                        optimized
                        width={5}
                      />
                      <StringField
                        label="Number of pages"
                        fieldPath="number_of_pages"
                        optimized
                        width={5}
                      />
                    </GroupField>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Grid.Column>
            <Grid.Column width={5}>
              <Header as="h4" attached="top">
                Access
              </Header>
              <Segment attached>
                <BooleanField
                  rightLabel="Restricted"
                  fieldPath="restricted"
                  toggle
                />
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Grid columns="equal">
          <Grid.Row>
            <Grid.Column>
              <Segment>
                <Grid columns="equal" divided>
                  <Grid.Row>
                    <Grid.Column width={11}>
                      <Header size="tiny" dividing>
                        Authors
                      </Header>
                      <AuthorsField isCreate={isCreate} fieldPath="authors" />
                    </Grid.Column>
                    <Grid.Column width={5}>
                      <BooleanField
                        rightLabel="Other authors"
                        fieldPath="other_authors"
                        toggle
                      />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Grid columns="equal">
          <Grid.Row>
            <Grid.Column width={11}>
              <Grid columns="equal">
                <Grid.Row>
                  <Grid.Column>
                    <Segment>
                      <Identifiers
                        scheme={
                          invenioConfig.VOCABULARIES.document.identifier.scheme
                        }
                      />
                    </Segment>
                  </Grid.Column>
                  <Grid.Column>
                    <Segment>
                      <UrlsField />
                    </Segment>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </>
    );
  }
}
DocumentBasicMetadata.propTypes = {
  isCreate: PropTypes.bool,
};

DocumentBasicMetadata.defaultProps = {
  isCreate: false,
};
