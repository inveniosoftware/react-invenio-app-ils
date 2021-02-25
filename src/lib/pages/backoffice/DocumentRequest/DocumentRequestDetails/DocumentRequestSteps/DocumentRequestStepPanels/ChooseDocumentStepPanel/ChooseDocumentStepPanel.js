import { documentApi } from '@api/documents';
import { goTo } from '@history';
import { ESSelector } from '@modules/ESSelector';
import { serializeDocument } from '@modules/ESSelector/serializer';
import { BackOfficeRoutes } from '@routes/urls';
import _get from 'lodash/get';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Button, Divider, Grid, Header, Segment } from 'semantic-ui-react';

export default class ChooseDocumentStepPanel extends Component {
  onSelectResult = (data) => {
    const { docReq, addDocument } = this.props;
    addDocument(docReq.pid, data.key);
  };

  goToCreateDocumentAndPrefill = (docReq) => {
    const data = {};
    const authors = _get(docReq, 'authors');
    if (authors) {
      data['authors'] = [{ full_name: _get(docReq, 'authors') }];
    }
    const journalTitle = _get(docReq, 'journal_title', '');
    const issue = _get(docReq, 'issue', '');
    const volume = _get(docReq, 'volume', '');
    if (journalTitle || issue || volume) {
      data['publication_info'] = [
        {
          journal_title: journalTitle,
          journal_issue: issue,
          journal_volume: volume,
        },
      ];
    }
    const isbn = _get(docReq, 'isbn');
    if (isbn) {
      data['identifiers'] = [{ scheme: 'ISBN', value: isbn }];
    }

    const edition = _get(docReq, 'edition');
    if (edition) {
      data['edition'] = edition;
    }
    const publicationYear = _get(docReq, 'publication_year');
    if (publicationYear) {
      data['publication_year'] = `${publicationYear}`; // it has to be a string
    }

    const createDocumentFormData = {
      formData: {
        title: docReq.title,
        ...data,
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
