import { documentApi } from '@api/documents';
import { eItemApi } from '@api/eitems';
import { invenioConfig } from '@config';
import { UrlsField } from '@forms/components/UrlsField';
import { BaseForm } from '@forms/core/BaseForm';
import { BooleanField } from '@forms/core/BooleanField';
import { SelectorField } from '@forms/core/SelectorField';
import { TextField } from '@forms/core/TextField';
import { goTo } from '@history';
import { serializeDocument } from '@modules/ESSelector/serializer';
import { Identifiers } from '@pages/backoffice/Document/DocumentForms/DocumentEditor/DocumentForm/components';
import { BackOfficeRoutes } from '@routes/urls';
import { getIn } from 'formik';
import pick from 'lodash/pick';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Grid, Header, Segment } from 'semantic-ui-react';
import eitemSubmitSerializer from './eitemSubmitSerializer';
import { DocumentIcon } from '@components/backoffice/icons';

export class EItemForm extends Component {
  prepareData = data => {
    return pick(data, [
      'bucket_id',
      'description',
      'document_pid',
      'document',
      'files',
      'internal_notes',
      'open_access',
      'urls',
      'identifiers',
    ]);
  };

  update = (pid, data) => {
    return eItemApi.update(pid, data);
  };

  create = data => {
    return eItemApi.create(data);
  };

  successCallback = response => {
    goTo(
      BackOfficeRoutes.eitemDetailsFor(getIn(response, 'data.metadata.pid'))
    );
  };

  render() {
    const { data, successSubmitMessage, title, pid } = this.props;
    return (
      <BaseForm
        initialValues={data ? this.prepareData(data.metadata) : {}}
        editApiMethod={this.update}
        createApiMethod={this.create}
        successCallback={this.successCallback}
        successSubmitMessage={successSubmitMessage}
        title={title}
        pid={pid ? pid : undefined}
        submitSerializer={eitemSubmitSerializer}
      >
        <Header as="h3" attached="top">
          Basic information
        </Header>
        <Segment attached>
          <Grid stretched>
            <Grid.Row>
              <Grid.Column width={8}>
                <SelectorField
                  required
                  emptyHeader="No document selected"
                  emptyDescription="Please select a document."
                  fieldPath="document"
                  errorPath="document_pid"
                  label="Document"
                  placeholder="Search for a document..."
                  icon={<DocumentIcon />}
                  query={documentApi.list}
                  serializer={serializeDocument}
                />
              </Grid.Column>
              <Grid.Column width={8}>
                <BooleanField
                  toggle
                  rightLabel="Open access"
                  fieldPath="open_access"
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>

          <Grid columns="equal">
            <Grid.Row>
              <Grid.Column>
                <TextField
                  label="Description"
                  fieldPath="description"
                  rows={5}
                />
              </Grid.Column>
              <Grid.Column>
                <TextField
                  label="Internal notes"
                  fieldPath="internal_notes"
                  rows={5}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>

          <Grid columns="equal">
            <Grid.Row>
              <Grid.Column>
                <Segment>
                  <UrlsField />
                </Segment>
              </Grid.Column>
              <Grid.Column>
                <Segment>
                  <Identifiers
                    scheme={
                      invenioConfig.VOCABULARIES.document.identifier.scheme
                    }
                  />
                </Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </BaseForm>
    );
  }
}

EItemForm.propTypes = {
  data: PropTypes.object,
  successSubmitMessage: PropTypes.string,
  title: PropTypes.string,
  pid: PropTypes.string,
};

EItemForm.defaultProps = {
  data: null,
  successSubmitMessage: null,
  title: null,
  pid: null,
};
