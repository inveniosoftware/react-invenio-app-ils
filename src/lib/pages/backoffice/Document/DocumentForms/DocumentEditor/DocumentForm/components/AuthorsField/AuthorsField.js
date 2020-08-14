import { invenioConfig } from '@config';
import { GroupField } from '@forms/core/GroupField';
import { ObjectListField } from '@forms/core/ObjectListField';
import { SubForm } from '@forms/core/SubForm';
import { FastField, Field, getIn } from 'formik';
import cloneDeep from 'lodash/cloneDeep';
import _isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React from 'react';
import { AuthorForm } from './AuthorForm';
import { AuthorSearchField } from './AuthorSearchField';

export class AuthorsField extends React.Component {
  state = {
    activeIndex: null,
    showForm: false,
  };

  componentDidMount() {
    this.onAuthorChange(0);
  }

  onRemove = (values, index, setFieldValue) => {
    this.setState({ showForm: false });
    setFieldValue(
      'authors',
      values.authors.filter((_, i) => i !== index)
    );
  };

  onSubmit = (values, index, setFieldValue) => {
    this.setState({ showForm: false });
    for (const key in values.authors) {
      setFieldValue(`authors.${key}`, values.authors[key]);
    }
  };

  onAuthorSearchChange = value => {
    if (value.length < 1) {
      this.setState({ activeIndex: null, showForm: false });
    }
  };

  onAuthorChange = index => {
    const { activeIndex, showForm } = this.state;
    // Hide then show the form to prevent display issues when switching between
    // authors.
    this.setState({ showForm: false }, () => {
      let showFormUpdated;
      if (index === activeIndex) {
        showFormUpdated = !showForm;
      } else {
        showFormUpdated = index !== null;
      }
      this.setState({ activeIndex: index, showForm: showFormUpdated });
    });
  };

  renderSubForm = (values, errors, setFieldValue) => {
    const { activeIndex } = this.state;
    const authors = cloneDeep(values.authors);
    const initialValues = {
      authors: {
        [activeIndex]: getIn(authors, activeIndex, {}),
      },
    };
    const { isCreate } = this.props;
    return (
      <GroupField border grouped>
        <SubForm
          basePath={`authors.${activeIndex}`}
          initialValues={initialValues}
          initialErrors={errors}
          initialStatus={errors}
          removeButtonText="Remove author"
          notRemovable={_isEmpty(authors) || activeIndex === authors.length}
          submitButtonText="Save author"
          onSubmit={(values, actions) =>
            this.onSubmit(values, activeIndex, setFieldValue)
          }
          onRemove={() => this.onRemove(values, activeIndex, setFieldValue)}
          render={(basePath, errors) => (
            <AuthorForm
              isCreate={isCreate}
              basePath={basePath}
              errors={errors}
            />
          )}
        />
      </GroupField>
    );
  };

  renderAuthors = authors => {
    const { fieldPath } = this.props;
    if (
      authors &&
      authors.length > invenioConfig.LITERATURE.authors.maxDisplay
    ) {
      return (
        <AuthorSearchField
          authors={authors}
          onSearchChange={this.onAuthorSearchChange}
          onResultSelect={result => this.onAuthorChange(result.index)}
          showMaxResults={15}
        />
      );
    }

    return (
      <ObjectListField
        fieldPath={fieldPath}
        keyField="full_name"
        onItemChange={this.onAuthorChange}
      />
    );
  };

  renderFormField = props => {
    const {
      form: { values, setFieldValue, errors },
    } = props;
    const { showForm } = this.state;

    return (
      <>
        {this.renderAuthors(values.authors)}
        {showForm && this.renderSubForm(values, errors, setFieldValue)}
      </>
    );
  };

  render() {
    const { optimized, fieldPath } = this.props;
    const FormikField = optimized ? FastField : Field;
    return <FormikField name={fieldPath} component={this.renderFormField} />;
  }
}

AuthorsField.propTypes = {
  fieldPath: PropTypes.string.isRequired,
  optimized: PropTypes.bool,
  isCreate: PropTypes.bool,
};

AuthorsField.defaultProps = {
  optimized: false,
  isCreate: false,
};
