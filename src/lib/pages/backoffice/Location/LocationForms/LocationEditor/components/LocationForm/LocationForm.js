import { delay } from '@api/utils';
import { BaseForm } from '@forms/core/BaseForm';
import { GroupField } from '@forms/core/GroupField';
import { StringField } from '@forms/core/StringField';
import { TextField } from '@forms/core/TextField';
import { goTo } from '@history';
import { BackOfficeRoutes } from '@routes/urls';
import pick from 'lodash/pick';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Closures } from './Closures';
import { Header, Segment } from 'semantic-ui-react';
import { locationApi } from '@api/locations/location';

export class LocationForm extends Component {
  prepareData = data => {
    return pick(data, [
      'name',
      'address',
      'email',
      'phone',
      'notes',
      'opening_weekdays',
      'opening_exceptions',
    ]);
  };

  prepareDataForCreation = () => {
    const defaultTimes = [
      { start_time: '08:00', end_time: '12:00' },
      { start_time: '13:00', end_time: '18:00' },
    ];
    return {
      opening_weekdays: [
        {
          weekday: 'monday',
          is_open: true,
          times: defaultTimes,
        },
        {
          weekday: 'tuesday',
          is_open: true,
          times: defaultTimes,
        },
        {
          weekday: 'wednesday',
          is_open: true,
          times: defaultTimes,
        },
        {
          weekday: 'thursday',
          is_open: true,
          times: defaultTimes,
        },
        {
          weekday: 'friday',
          is_open: true,
          times: defaultTimes,
        },
        {
          weekday: 'saturday',
          is_open: false,
        },
        {
          weekday: 'sunday',
          is_open: false,
        },
      ],
      opening_exceptions: [],
    };
  };

  processData = data => {
    data['opening_weekdays'].forEach(element => {
      if (!element['is_open']) {
        delete element['times'];
      }
    });
    if (data['opening_exceptions'] === undefined) {
      data['opening_exceptions'] = [];
    } else {
      data['opening_exceptions'].forEach(element => {
        if (element['is_open'] === undefined) {
          element['is_open'] = false;
        }
      });
    }
    return data;
  };

  updateLocation = async (pid, data) => {
    data = this.processData(data);
    const response = await locationApi.update(pid, data);
    await delay();
    return response;
  };

  createLocation = async data => {
    data = this.processData(data);
    const response = await locationApi.create(data);
    await delay();
    return response;
  };

  successCallback = result =>
    goTo(BackOfficeRoutes.locationsDetailsFor(result.data.pid));

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
          formInitialData
            ? this.prepareData(formInitialData.metadata)
            : this.prepareDataForCreation()
        }
        editApiMethod={this.updateLocation}
        createApiMethod={this.createLocation}
        successCallback={this.successCallback}
        successSubmitMessage={successSubmitMessage}
        title={title}
        pid={pid ? pid : undefined}
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
          <Closures />
        </Segment>
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
