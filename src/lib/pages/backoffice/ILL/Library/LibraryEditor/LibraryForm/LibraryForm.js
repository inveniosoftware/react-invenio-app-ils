import { illLibraryApi as libraryApi } from '@api';
import { BaseForm, StringField, TextField } from '@forms/core';
import { goTo } from '@history';
import { ILLRoutes } from '@routes/urls';
import { getIn } from 'formik';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';

export class LibraryForm extends Component {
  get buttons() {
    const { pid: isEditing } = this.props;
    return isEditing
      ? [
          {
            name: 'update',
            content: 'Update library',
            primary: true,
            type: 'submit',
          },
        ]
      : [
          {
            name: 'create',
            content: 'Create library',
            primary: true,
            type: 'submit',
          },
        ];
  }

  updateLibrary = (pid, data) => {
    return libraryApi.update(pid, data);
  };

  createLibrary = data => {
    return libraryApi.create(data);
  };

  successCallback = (response, submitButton) => {
    const library = getIn(response, 'data');
    goTo(ILLRoutes.libraryDetailsFor(library.metadata.pid));
  };

  render() {
    const { data, successSubmitMessage, title, pid } = this.props;
    return (
      <BaseForm
        initialValues={data ? data.metadata : {}}
        editApiMethod={this.updateLibrary}
        createApiMethod={this.createLibrary}
        successCallback={this.successCallback}
        successSubmitMessage={successSubmitMessage}
        title={title}
        pid={pid}
        buttons={this.buttons}
      >
        <Segment raised>
          <StringField label="Name" fieldPath="name" required />
          <StringField label="Address" fieldPath="address" />
          <StringField label="Email" fieldPath="email" />
          <StringField label="Phone" fieldPath="phone" />
          <TextField label="Notes" fieldPath="notes" rows={5} />
        </Segment>
      </BaseForm>
    );
  }
}

LibraryForm.propTypes = {
  data: PropTypes.object,
  successSubmitMessage: PropTypes.string,
  title: PropTypes.string,
  pid: PropTypes.string,
};

LibraryForm.defaultProps = {
  data: null,
  successSubmitMessage: null,
  title: null,
  pid: null,
};
