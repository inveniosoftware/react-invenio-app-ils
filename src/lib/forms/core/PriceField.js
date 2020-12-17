import { FastField, Field, getIn } from 'formik';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Dropdown, Form, Input } from 'semantic-ui-react';
import { invenioConfig } from '@config';
import { vocabularyApi } from '@api/vocabularies';
import { withCancel } from '@api/utils';
import _isEmpty from 'lodash/isEmpty';

class CurrencyDropdown extends Component {
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

  serializer = (hit) => ({
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
      const currencies = response.data.hits.map((hit) => this.serializer(hit));
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
    const { defaultCurrency } = this.props;
    const { isLoading } = this.state;
    const visibleOptions =
      defaultCurrency !== null
        ? options.filter((o) => o.value === defaultCurrency)
        : options;
    visibleOptions.unshift({
      key: '',
      value: '',
      text: '-',
    });
    if (!isLoading) {
      if (!_isEmpty(value) && !visibleOptions.find((o) => o.value === value)) {
        visibleOptions.push({
          key: value,
          value: value,
          text: `Missing value: ${value}`,
          error: undefined,
        });
      }
    }
    return visibleOptions;
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
    return (
      <Dropdown
        selection
        compact
        options={this.getAllOptions(currencies, value)}
        text={error && errorText ? errorText : value ? value : '-'}
        value={value}
        onChange={(_, { value }) => setFieldValue(name, value)}
        error={!!errorText}
        loading={isLoading}
        {...uiProps}
      />
    );
  }
}

CurrencyDropdown.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  children: PropTypes.node,
  required: PropTypes.bool,
  defaultCurrency: PropTypes.string,
};

CurrencyDropdown.defaultProps = {
  children: null,
  required: false,
  defaultCurrency: null,
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

  renderCurrencyLabel = (props) => {
    const {
      fieldPath,
      defaultCurrency,
      canSelectCurrency,
      required,
    } = this.props;
    const name = `${fieldPath}.currency`;
    return (
      <Field
        name={name}
        required={required}
        defaultCurrency={canSelectCurrency ? defaultCurrency : null}
        component={CurrencyDropdown}
      />
    );
  };

  renderFormField = (props) => {
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
      form: { values, handleChange, handleBlur, errors, status, isSubmitting },
    } = props;
    return (
      <Form.Field
        inline={inline}
        required={required}
        error={
          this.renderError(status || errors, `${fieldPath}.currency`) ||
          this.renderError(status || errors, `${fieldPath}.value`)
        }
        disabled={isSubmitting}
      >
        <label>{label}</label>
        <Input
          fluid
          type="number"
          step="any"
          min="0"
          label={this.renderCurrencyLabel(props)}
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
