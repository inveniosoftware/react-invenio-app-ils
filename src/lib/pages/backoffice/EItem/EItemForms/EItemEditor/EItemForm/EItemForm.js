import { documentApi, eItemApi } from '@api';
import { UrlsField } from '@forms/components';
import { BaseForm, BooleanField, SelectorField, TextField } from '@forms/core';
import { goTo } from '@history';
import { serializeDocument } from '@modules/ESSelector/serializer';
import { BackOfficeRoutes } from '@routes/urls';
import { getIn } from 'formik';
import pick from 'lodash/pick';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import eitemSubmitSerializer from './eitemSubmitSerializer';

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
        <SelectorField
          required
          emptyHeader="No document selected"
          emptyDescription="Please select a document."
          fieldPath="document"
          errorPath="document_pid"
          label="Document"
          placeholder="Search for a document..."
          query={documentApi.list}
          serializer={serializeDocument}
        />
        <TextField label="Description" fieldPath="description" rows={5} />
        <BooleanField toggle label="Open access" fieldPath="open_access" />
        <UrlsField />
        <TextField label="Internal notes" fieldPath="internal_notes" rows={5} />
      </BaseForm>
    );
  }
}

EItemForm.propTypes = {
  data: PropTypes.object,
  successSubmitMessage: PropTypes.string,
  title: PropTypes.string,
  pid: PropTypes.string.isRequired,
};

EItemForm.defaultProps = {
  data: null,
  successSubmitMessage: null,
  title: null,
};
