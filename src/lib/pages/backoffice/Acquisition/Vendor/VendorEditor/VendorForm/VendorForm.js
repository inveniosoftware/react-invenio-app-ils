import { vendorApi } from '@api/acquisition';
import { BaseForm } from '@forms/core/BaseForm';
import { GroupField } from '@forms/core/GroupField';
import { StringField } from '@forms/core/StringField';
import { TextField } from '@forms/core/TextField';
import { goTo } from '@history';
import { AcquisitionRoutes } from '@routes/urls';
import { getIn } from 'formik';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Header, Segment } from 'semantic-ui-react';

export class VendorForm extends Component {
  get buttons() {
    const { pid: isEditing } = this.props;
    return isEditing
      ? [
          {
            name: 'update',
            content: 'Update vendor',
            primary: true,
            type: 'submit',
          },
        ]
      : [
          {
            name: 'create',
            content: 'Create vendor',
            primary: true,
            type: 'submit',
          },
        ];
  }

  createVendor = data => {
    return vendorApi.create(data);
  };

  updateVendor = (pid, data) => {
    return vendorApi.update(pid, data);
  };

  successCallback = response => {
    goTo(
      AcquisitionRoutes.vendorDetailsFor(getIn(response, 'data.metadata.pid'))
    );
  };

  render() {
    const { data, successSubmitMessage, title, pid } = this.props;
    return (
      <BaseForm
        initialValues={data ? data.metadata : {}}
        editApiMethod={this.updateVendor}
        createApiMethod={this.createVendor}
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

VendorForm.propTypes = {
  data: PropTypes.object,
  successSubmitMessage: PropTypes.string,
  title: PropTypes.string,
  pid: PropTypes.string,
};
VendorForm.defaultProps = {
  data: null,
  successSubmitMessage: null,
  title: null,
  pid: null,
};
