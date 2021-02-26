import { locationApi } from '@api/locations';
import { withCancel } from '@api/utils';
import { Error } from '@components/Error';
import { Loader } from '@components/Loader';
import { RJSForm } from '@forms/rjsf';
import { goTo } from '@history';
import { BackOfficeRoutes } from '@routes/urls';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { schema } from './schema';
import { uiSchema } from './uiSchema';

export class LocationEditor extends Component {
  constructor(props) {
    super(props);

    const isEditing = !!props.match.params.locationPid;
    this.state = {
      data: {},
      isLoading: isEditing,
      error: {},
    };
  }

  componentDidMount() {
    const { match } = this.props;
    if (match.params.locationPid) {
      this.fetch(match.params.locationPid);
    }
  }

  componentWillUnmount() {
    this.cancellableFetch && this.cancellableFetch.cancel();
  }

  fetch = async (locationPid) => {
    this.cancellableFetch = withCancel(locationApi.get(locationPid));
    try {
      const response = await this.cancellableFetch.promise;
      this.setState({ data: response.data, isLoading: false, error: {} });
    } catch (error) {
      if (error !== 'UNMOUNTED') {
        this.setState({ isLoading: false, error: error });
      }
    }
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

  processData = (data) => {
    data['opening_weekdays'].forEach((element) => {
      if (!element['is_open']) {
        delete element['times'];
      } else if (element['times']) {
        element['times'] = element['times'].filter((e) => e);
      }
    });
    if (data['opening_exceptions'] === undefined) {
      data['opening_exceptions'] = [];
    } else {
      data['opening_exceptions'].forEach((element) => {
        if (element['is_open'] === undefined) {
          element['is_open'] = false;
        }
      });
    }
    return data;
  };

  submitAction = async (formData) => {
    const {
      match: {
        params: { locationPid },
      },
    } = this.props;

    formData = this.processData(formData);

    const isEditing = !!locationPid;
    return isEditing
      ? await locationApi.update(locationPid, formData)
      : await locationApi.create(formData);
  };

  successCallback = (response) => {
    goTo(
      BackOfficeRoutes.locationsDetailsFor(_get(response, 'data.metadata.pid'))
    );
  };

  render() {
    const {
      match: {
        params: { locationPid },
      },
    } = this.props;
    const { isLoading, error, data } = this.state;

    const isEditing = !!locationPid;
    if (isEditing) {
      const formTitle = `Location - Edit #${locationPid}`;
      return (
        <Loader isLoading={isLoading}>
          <Error error={error}>
            <RJSForm
              schema={schema}
              uiSchema={uiSchema(formTitle)}
              formData={data.metadata}
              submitAction={this.submitAction}
              successCallback={this.successCallback}
              successMessage="The location was successfully updated."
            />
          </Error>
        </Loader>
      );
    } else {
      const formTitle = 'Location - Create';
      const prefilledFormData = _get(this.props, 'location.state.formData', {});
      const formInitialData = !_isEmpty(prefilledFormData)
        ? prefilledFormData
        : this.prepareDataForCreation();
      return (
        <RJSForm
          schema={schema}
          uiSchema={uiSchema(formTitle)}
          formData={formInitialData}
          submitAction={this.submitAction}
          successCallback={this.successCallback}
          successMessage="The location was successfully created."
        />
      );
    }
  }
}

LocationEditor.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      locationPid: PropTypes.string,
    }),
  }).isRequired,
  location: PropTypes.shape({
    state: PropTypes.shape({
      formData: PropTypes.object,
      extraData: PropTypes.object,
    }),
  }),
};

LocationEditor.defaultProps = {
  location: {
    state: null,
  },
};
