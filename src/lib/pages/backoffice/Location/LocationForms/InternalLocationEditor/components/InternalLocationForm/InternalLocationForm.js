import { internalLocationApi } from '@api/locations';
import { locationApi } from '@api/locations/location';
import { delay } from '@api/utils';
import { BaseForm } from '@forms/core/BaseForm';
import { SelectorField } from '@forms/core/SelectorField';
import { StringField } from '@forms/core/StringField';
import { TextField } from '@forms/core/TextField';
import { goTo } from '@history';
import { serializeLocation } from '@modules/ESSelector/serializer';
import { BackOfficeRoutes } from '@routes/urls';
import _isEmpty from 'lodash/isEmpty';
import pick from 'lodash/pick';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

export class InternalLocationForm extends Component {
  prepareData = data => {
    return pick(data, [
      'name',
      'location',
      'location_pid',
      'physical_location',
      'notes',
    ]);
  };

  updateInternalLocation = async (pid, data) => {
    const response = await internalLocationApi.update(pid, data);
    await delay();
    return response;
  };

  createInternalLocation = async data => {
    return internalLocationApi.create(data);
  };

  successCallback = () => goTo(BackOfficeRoutes.locationsList);

  submitSerializer = values => {
    const submitValues = { ...values };
    _isEmpty(values.location)
      ? (submitValues.location_pid = undefined)
      : (submitValues.location_pid = values.location.pid);
    delete submitValues.location;
    return submitValues;
  };

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
        editApiMethod={this.updateInternalLocation}
        createApiMethod={this.createInternalLocation}
        successCallback={this.successCallback}
        successSubmitMessage={successSubmitMessage}
        title={title}
        pid={pid ? pid : undefined}
        submitSerializer={this.submitSerializer}
      >
        <StringField label="Name" fieldPath="name" required />
        <SelectorField
          required
          emptyHeader="No location selected"
          emptyDescription="Please select a location."
          fieldPath="location"
          errorPath="location_pid"
          label="Location"
          placeholder="Search for a location..."
          query={locationApi.list}
          serializer={serializeLocation}
        />
        <StringField label="Physical Location" fieldPath="physical_location" />
        <TextField label="Notes" fieldPath="notes" rows={5} />
      </BaseForm>
    );
  }
}

InternalLocationForm.propTypes = {
  data: PropTypes.object,
  successSubmitMessage: PropTypes.string,
  title: PropTypes.string,
  pid: PropTypes.string,
};

InternalLocationForm.defaultProps = {
  data: null,
  successSubmitMessage: null,
  title: null,
  pid: null,
};
