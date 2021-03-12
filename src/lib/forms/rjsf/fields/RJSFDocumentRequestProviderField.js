import { orderApi } from '@api/acquisition';
import { borrowingRequestApi } from '@api/ill';
import { invenioConfig } from '@config';
import { RJSFESSelector } from '@forms/rjsf/widgets/RJSFESSelector';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Form, Header } from 'semantic-ui-react';

class ProviderPidType extends Component {
  constructor(props) {
    super(props);

    this.options = [
      ...Object.values(
        invenioConfig.DOCUMENT_REQUESTS.physicalItemProviders
      ).map((p) => ({
        key: p.pid_type,
        value: p.pid_type,
        text: p.name,
      })),
    ];

    const { initialValue } = this.props;
    this.state = {
      value: initialValue,
    };
  }

  handleOnChange = (e, { value }) => {
    const { onChange } = this.props;
    // if empty string, set it to `undefined` as needed by RJSF
    const newValue = value || undefined;
    this.setState({ value: newValue });
    onChange(newValue);
  };

  render() {
    const { value } = this.state;
    return (
      <Form.Select
        fluid
        selection
        clearable
        options={this.options}
        label="Select Acquisition or ILL"
        value={value}
        onChange={this.handleOnChange}
      />
    );
  }
}

ProviderPidType.propTypes = {
  initialValue: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

ProviderPidType.defaultProps = {
  initialValue: null,
};

class ProviderPidValue extends Component {
  constructor(props) {
    super(props);
    const { initialValue } = this.props;
    this.state = {
      value: initialValue,
    };
    // create a ref to the inner RJSFESSelector to be able to
    // call the clearValue method
    this.rjsfEsSelector = React.createRef();
  }

  get defaultAPIs() {
    return {
      apiGetByValue: () => {},
      apiGetByValueResponseSerializer: () => {},
      apiQuery: () => {},
      apiQueryResponseSerializer: () => {},
    };
  }

  get acqOrderAPIs() {
    return {
      apiGetByValue: async (value) => await orderApi.get(value),
      apiGetByValueResponseSerializer: this.responseSerializer,
      apiQuery: async (searchQuery) => await orderApi.list(searchQuery),
      apiQueryResponseSerializer: this.responseSerializer,
    };
  }

  get brwReqAPIs() {
    return {
      apiGetByValue: async (value) => await borrowingRequestApi.get(value),
      apiGetByValueResponseSerializer: this.responseSerializer,
      apiQuery: async (searchQuery) =>
        await borrowingRequestApi.list(searchQuery),
      apiQueryResponseSerializer: this.responseSerializer,
    };
  }

  responseSerializer(record) {
    return {
      key: record.metadata.pid,
      value: record.metadata.pid,
      text: record.metadata.pid,
      content: (
        <Header
          as="h5"
          content={record.metadata.provider.name}
          subheader={`PID: ${record.metadata.pid}`}
        />
      ),
    };
  }

  getApis(selectedPidType) {
    let apis = {};
    switch (selectedPidType) {
      case invenioConfig.DOCUMENT_REQUESTS.physicalItemProviders.acq.pid_type: {
        apis = this.acqOrderAPIs;
        break;
      }
      case invenioConfig.DOCUMENT_REQUESTS.physicalItemProviders.ill.pid_type: {
        apis = this.brwReqAPIs;
        break;
      }
      default:
        apis = this.defaultAPIs;
    }
    return apis;
  }

  getExtraProps(selectedPidType) {
    let props = {};
    switch (selectedPidType) {
      case invenioConfig.DOCUMENT_REQUESTS.physicalItemProviders.acq.pid_type: {
        props = {
          label: 'Select Acquisition order',
          disabled: false,
        };
        break;
      }
      case invenioConfig.DOCUMENT_REQUESTS.physicalItemProviders.ill.pid_type: {
        props = {
          label: 'Select Interlibrary loan',
          disabled: false,
        };
        break;
      }
      default:
        props = {
          label: 'Select Acquisition or ILL',
          disabled: true,
        };
    }
    return props;
  }

  onPidTypeChanged() {
    this.rjsfEsSelector.current.clearValue();
  }

  handleOnChange = (value) => {
    const { onChange } = this.props;
    // if empty string, set it to `undefined` as needed by RJSF
    const newValue = value || undefined;
    this.setState({ value: newValue });
    onChange(newValue);
  };

  render() {
    const { selectedPidType } = this.props;
    const { value } = this.state;

    return (
      <RJSFESSelector
        ref={this.rjsfEsSelector}
        value={value}
        onChange={this.handleOnChange}
        required={selectedPidType ? true : false}
        {...this.getExtraProps(selectedPidType)}
        options={{ ...this.getApis(selectedPidType), selectMultiple: false }}
      />
    );
  }
}

ProviderPidValue.propTypes = {
  selectedPidType: PropTypes.string,
  initialValue: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

ProviderPidValue.defaultProps = {
  selectedPidType: null,
  initialValue: null,
};

/**
 * React JSONSchema Form specialized field to search and retrieve
 * providers for a "New document request".
 * This custom field renders 2 components:
 * - a dropdown to select first if the provider is Acquisition or Interlibrary loan
 * - the selected provider value
 */
export class RJSFDocumentRequestProviderField extends Component {
  constructor(props) {
    super(props);

    const { formData } = this.props;
    this.state = {
      pidType: formData.pid_type,
    };
    // create a ref to the inner ProviderPidValue to be able to
    // call the onPidTypeChanged method
    this.providerPidValue = React.createRef();
  }

  handlePidTypeChange = (value) => {
    const { onChange } = this.props;

    // notify that the pid_type has been changed
    this.providerPidValue.current.onPidTypeChanged();

    this.setState({ pidType: value });
    onChange({
      pid_type: value,
      pid: undefined,
    });
  };

  handlePidValueChange = (value) => {
    const { onChange } = this.props;
    const { pidType } = this.state;

    // if the pidType is selected, then set the object otherwise
    // unset/unselect it
    const fieldValue = pidType
      ? {
          pid_type: pidType,
          pid: value,
        }
      : undefined;

    onChange(fieldValue);
  };

  render() {
    const { formData } = this.props;
    const { pidType } = this.state;

    return (
      <>
        <ProviderPidType
          initialValue={formData.pid_type}
          onChange={this.handlePidTypeChange}
        />
        <ProviderPidValue
          ref={this.providerPidValue}
          initialValue={formData.pid}
          onChange={this.handlePidValueChange}
          selectedPidType={pidType}
        />
      </>
    );
  }
}

RJSFDocumentRequestProviderField.propTypes = {
  formData: PropTypes.object,
  onChange: PropTypes.func.isRequired,
};

RJSFDocumentRequestProviderField.defaultProps = {
  formData: {},
};
