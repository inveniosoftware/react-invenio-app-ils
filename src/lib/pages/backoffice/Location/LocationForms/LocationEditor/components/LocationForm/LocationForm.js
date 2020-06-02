import { locationApi } from '@api/locations/location';
import { delay } from '@api/utils';
import { BaseForm } from '@forms/core/BaseForm';
import { StringField } from '@forms/core/StringField';
import { TextField } from '@forms/core/TextField';
import { goTo } from '@history';
import { BackOfficeRoutes } from '@routes/urls';
import pick from 'lodash/pick';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

export class LocationForm extends Component {
  prepareData = data => {
    return pick(data, ['name', 'address', 'email', 'phone', 'notes']);
  };

  updateLocation = async (pid, data) => {
    const response = await locationApi.update(pid, data);
    await delay();
    return response;
  };

  createLocation = async data => {
    const response = await locationApi.create(data);
    await delay();
    return response;
  };

  successCallback = () => goTo(BackOfficeRoutes.locationsList);

  render() {
    const {
      data: formInitialData,
      successSubmitMessage,
      title,
      pid,
    } = this.props;
    return (
      <BaseForm
        initialValues={
          formInitialData ? this.prepareData(formInitialData.metadata) : {}
        }
        editApiMethod={this.updateLocation}
        createApiMethod={this.createLocation}
        successCallback={this.successCallback}
        successSubmitMessage={successSubmitMessage}
        title={title}
        pid={pid ? pid : undefined}
      >
        <StringField label="Name" fieldPath="name" required />
        <StringField label="Address" fieldPath="address" />
        <StringField label="Email" fieldPath="email" />
        <StringField label="Phone" fieldPath="phone" />
        <TextField label="Notes" fieldPath="notes" rows={5} />
      </BaseForm>
    );
  }
}

LocationForm.propTypes = {
  data: PropTypes.object,
  successSubmitMessage: PropTypes.string,
  title: PropTypes.string,
  pid: PropTypes.string,
};

LocationForm.defaultProps = {
  data: null,
  successSubmitMessage: null,
  title: null,
  pid: null,
};
