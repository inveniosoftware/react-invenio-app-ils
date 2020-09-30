import { FastField, Field, getIn } from 'formik';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Dropdown, Form, Input, Label } from 'semantic-ui-react';
import { invenioConfig } from '@config';
import { vocabularyApi } from '@api/vocabularies';
import { withCancel } from '@api/utils';
import _isEmpty from 'lodash/isEmpty';

class PriceDropdown extends Component {
  state = {
    isLoading: true,
    error: null,
    currencies: [],
  };

  componentDidMount() {
    this.fetchCurrencies();
  }

  componentWillUnmount() {
    this.cancellableFetchData && this.cancellableFetchData.cancel();
  }

  serializer = hit => ({
    key: hit.metadata.key,
    value: hit.metadata.key,
    text: hit.metadata.key,
  });

  query = () => {
    const searchQuery = vocabularyApi
      .query()
      .withType(invenioConfig.VOCABULARIES.currencies)
      .qs();
    return vocabularyApi.list(searchQuery);
  };

  fetchCurrencies = async () => {
    this.cancellableFetchData = withCancel(this.query());
    try {
      const response = await this.cancellableFetchData.promise;
      const currencies = response.data.hits.map(hit => this.serializer(hit));
      this.setState({ isLoading: false, currencies: currencies, error: null });
    } catch (error) {
      if (error !== 'UNMOUNTED') {
        this.setState({
          isLoading: false,
          error: 'Error loading currencies.',
        });
      }
    }
  };

  getAllOptions = (options, value) => {
    const {
      field: { required },
    } = this.props;
    const { isLoading } = this.state;
    if (!required) {
      options = [
        {
          key: '',
          value: undefined,
          text: '-',
        },
        ...options,
      ];
    }
    if (!isLoading) {
      if (!_isEmpty(value) && !options.find(o => o.value === value)) {
        options.push({
          key: value,
          value: value,
          text: `Missing value: ${value}`,
          error: undefined,
        });
      }
    }
    return options;
  };

  render() {
    const {
      field: { name, value },
      form: { touched, errors, setFieldValue },
      children: _,
      ...uiProps
    } = this.props;
    const { isLoading, currencies, error } = this.state;
    const errorText = error || (touched[name] && errors[name]);
    const currentValue = value
      ? value
      : currencies.length && currencies[0].value;
    return (
      <Dropdown
        selection
        compact
        options={this.getAllOptions(currencies, value)}
        text={error && !currentValue && errorText}
        value={currentValue}
        onChange={(_, { value }) => setFieldValue(name, value)}
        error={!!errorText}
        loading={isLoading}
        {...uiProps}
      />
    );
  }
}

PriceDropdown.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  children: PropTypes.node,
  required: PropTypes.bool,
};

PriceDropdown.defaultProps = {
  children: null,
  required: false,
};

export class PriceField extends Component {
  renderError = (errors, name, direction = 'above') => {
    const errorText = errors[name];
    return errorText
      ? {
          content: errorText,
          pointing: direction,
        }
      : null;
  };

  renderCurrencyLabel = () => {
    const {
      fieldPath,
      defaultCurrency,
      canSelectCurrency,
      required,
    } = this.props;
    const name = `${fieldPath}.currency`;
    return canSelectCurrency ? (
      <Field name={name} required={required} component={PriceDropdown} />
    ) : (
      <Label name={name}>{defaultCurrency}</Label>
    );
  };

  renderFormField = props => {
    const {
      fieldPath,
      defaultCurrency,
      canSelectCurrency,
      inline,
      label,
      required,
      optimized,
      ...uiProps
    } = this.props;
    const {
      form: { values, handleChange, handleBlur, errors, status },
    } = props;
    return (
      <Form.Field
        inline={inline}
        required={required}
        error={this.renderError(status || errors, `${fieldPath}.value`)}
      >
        <label>{label}</label>
        <Input
          fluid
          type="number"
          step="any"
          min="0"
          label={this.renderCurrencyLabel()}
          labelPosition="left"
          id={`${fieldPath}.value`}
          name={`${fieldPath}.value`}
          onChange={handleChange}
          onBlur={handleBlur}
          value={getIn(values, `${fieldPath}.value`, '')}
          {...uiProps}
        />
      </Form.Field>
    );
  };

  render() {
    const { optimized, fieldPath } = this.props;
    const FormikField = optimized ? FastField : Field;
    return <FormikField name={fieldPath} component={this.renderFormField} />;
  }
}

PriceField.propTypes = {
  fieldPath: PropTypes.string.isRequired,
  defaultCurrency: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  canSelectCurrency: PropTypes.bool,
  required: PropTypes.bool,
  inline: PropTypes.bool,
  optimized: PropTypes.bool,
};

PriceField.defaultProps = {
  canSelectCurrency: true,
  required: false,
  inline: false,
  optimized: true,
};
