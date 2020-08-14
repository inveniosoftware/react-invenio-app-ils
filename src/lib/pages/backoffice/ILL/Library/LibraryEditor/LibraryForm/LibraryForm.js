import { libraryApi } from '@api/ill';
import { BaseForm } from '@forms/core/BaseForm';
import { GroupField } from '@forms/core/GroupField';
import { StringField } from '@forms/core/StringField';
import { TextField } from '@forms/core/TextField';
import { goTo } from '@history';
import { ILLRoutes } from '@routes/urls';
import { getIn } from 'formik';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Header, Segment } from 'semantic-ui-react';

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
        <Header as="h3" attached="top">
          Basic information
        </Header>
        <Segment attached>
          <GroupField>
            <StringField label="Name" fieldPath="name" required />
            <StringField label="Phone" fieldPath="phone" />
          </GroupField>
          <GroupField>
            <StringField label="Email" fieldPath="email" />
            <StringField label="Address" fieldPath="address" />
          </GroupField>
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
