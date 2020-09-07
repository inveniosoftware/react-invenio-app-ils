import { invenioConfig } from '@config';
import { DeleteActionButton } from '@forms/components/DeleteActionButton';
import { IdentifiersField } from '@forms/components/IdentifiersField';
import { AccordionField } from '@forms/core/AccordionField';
import { ArrayField } from '@forms/core/ArrayField';
import { GroupField } from '@forms/core/GroupField';
import { StringField } from '@forms/core/StringField';
import { VocabularyField } from '@forms/core/VocabularyField';
import PropTypes from 'prop-types';
import React from 'react';
import { Divider, Grid } from 'semantic-ui-react';

export class AuthorForm extends React.Component {
  constructor(props) {
    super(props);
    this.authorVocabularies = invenioConfig.VOCABULARIES.document.author;
  }

  renderAffiliation = ({ arrayPath, indexPath, ...arrayHelpers }) => {
    const path = `${arrayPath}.${indexPath}`;
    return (
      <GroupField
        basic
        border
        action={
          <DeleteActionButton onClick={() => arrayHelpers.remove(indexPath)} />
        }
      >
        <StringField
          required
          fluid
          label="Affiliation Name"
          fieldPath={`${path}.name`}
        />
        <GroupField grouped widths="equal">
          <IdentifiersField
            basic
            fieldPath={`${path}.identifiers`}
            label=""
            schemeVocabularyType={
              this.authorVocabularies.affiliation.identifier.scheme
            }
          />
        </GroupField>
      </GroupField>
    );
  };

  renderAlternativeName = ({ arrayPath, indexPath, ...arrayHelpers }) => {
    return (
      <GroupField
        basic
        border
        action={
          <DeleteActionButton onClick={() => arrayHelpers.remove(indexPath)} />
        }
      >
        <StringField
          required
          fluid
          label="Alternative name"
          fieldPath={`${arrayPath}.${indexPath}`}
        />
      </GroupField>
    );
  };

  renderRole = ({ arrayPath, indexPath }) => {
    return (
      <GroupField basic>
        <VocabularyField
          type={this.authorVocabularies.roles.type}
          fieldPath={`${arrayPath}.${indexPath}`}
          label="Role"
          placeholder="Select an author role..."
        />
      </GroupField>
    );
  };

  render() {
    const { basePath } = this.props;
    return (
      <GroupField basic>
        <GroupField widths="equal">
          <StringField
            required
            fieldPath={`${basePath}.full_name`}
            label="Full name"
          />
          <VocabularyField
            type={this.authorVocabularies.type}
            fieldPath={`${basePath}.type`}
            label="Type"
            placeholder="Select an author type..."
          />
          <VocabularyField
            multiple
            type={this.authorVocabularies.roles.type}
            fieldPath={`${basePath}.roles`}
            label="Role"
            placeholder="Select an author role..."
          />
        </GroupField>
        <Divider />
        <Grid stretched columns="equal" divided>
          <Grid.Row className="no-padding ">
            <Grid.Column>
              <AccordionField
                label="Affiliations"
                fieldPath="affiliations"
                content={
                  <ArrayField
                    fieldPath={`${basePath}.affiliations`}
                    defaultNewValue={{ name: '', identifiers: [] }}
                    renderArrayItem={this.renderAffiliation}
                    addButtonLabel="Add affiliation"
                  />
                }
              />
            </Grid.Column>
            <Grid.Column>
              <IdentifiersField
                accordion
                fieldPath={`${basePath}.identifiers`}
                schemeVocabularyType={this.authorVocabularies.identifier.scheme}
              />
            </Grid.Column>
            <Grid.Column>
              <AccordionField
                label="Alternative Names"
                fieldPath="alternative_names"
                content={
                  <ArrayField
                    fieldPath={`${basePath}.alternative_names`}
                    defaultNewValue=""
                    renderArrayItem={this.renderAlternativeName}
                    addButtonLabel="Add alternative name"
                  />
                }
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </GroupField>
    );
  }
}

AuthorForm.propTypes = {
  basePath: PropTypes.string.isRequired,
};
