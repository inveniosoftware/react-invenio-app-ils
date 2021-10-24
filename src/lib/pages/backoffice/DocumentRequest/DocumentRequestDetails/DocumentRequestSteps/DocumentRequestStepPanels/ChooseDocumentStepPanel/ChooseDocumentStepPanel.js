import { documentApi } from '@api/documents';
import { goTo } from '@history';
import { ESSelector } from '@modules/ESSelector';
import { serializeDocument } from '@modules/ESSelector/serializer';
import { BackOfficeRoutes } from '@routes/urls';
import mapFields from '@forms/mapFields';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Button, Divider, Grid, Header, Segment } from 'semantic-ui-react';

export default class ChooseDocumentStepPanel extends Component {
  onSelectResult = (data) => {
    const { docReq, addDocument } = this.props;
    addDocument(docReq.pid, data.key);
  };

  goToCreateDocumentAndPrefill = (docReq) => {
    const mappings = [
      ['authors', 'authors[0].full_name'],
      ['journal_title', 'publication_info[0].journal_title'],
      ['issue', 'publication_info[0].journal_issue'],
      ['volume', 'publication_info[0].journal_volume'],
      ['isbn', 'identifiers[0]', (value) => ({ scheme: 'ISBN', value: value })],
      ['edition', 'edition'],
      ['publication_year', 'publication_year', (value) => value.toString()],
      ['publisher', 'imprint.publisher'],
    ];

    const prefilledData = mapFields({
      origin: docReq,
      mappings,
    });

    const createDocumentFormData = {
      formData: {
        title: docReq.title,
        ...prefilledData,
      },
      extraData: {
        attachCreatedDocumentToDocumentRequest: true,
        documentRequestPid: docReq.pid,
      },
    };

    goTo(BackOfficeRoutes.documentCreate, createDocumentFormData);
  };

  createDocumentButton = (docReq) => {
    return (
      <Button
        name="create-doc-from-doc-request"
        labelPosition="left"
        positive
        onClick={() => this.goToCreateDocumentAndPrefill(docReq)}
        icon="plus"
        content="Create new document"
      />
    );
  };

  render() {
    const { docReq } = this.props;
    return (
      <Segment>
        <Grid columns={2}>
          <Grid.Column>
            <Header as="h3">Search and select document</Header>
            <ESSelector
              onSelectResult={this.onSelectResult}
              query={documentApi.list}
              serializer={serializeDocument}
            />
          </Grid.Column>
          <Grid.Column textAlign="center" verticalAlign="middle">
            {this.createDocumentButton(docReq)}
          </Grid.Column>
        </Grid>
        <Divider vertical>Or</Divider>
      </Segment>
    );
  }
}

ChooseDocumentStepPanel.propTypes = {
  docReq: PropTypes.object.isRequired,
  addDocument: PropTypes.func.isRequired,
};
