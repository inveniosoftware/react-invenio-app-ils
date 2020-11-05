import DocumentLanguages from '@modules/Document/DocumentLanguages';
import { DocumentSelectListEntry } from '@modules/Document/backoffice/DocumentSelectListEntry';
import { RelationModal } from '@modules/Relations/backoffice/components/RelationModal';
import { RelationSummary } from '@modules/Relations/backoffice/components/RelationSummary';
import { RelationSelector } from '@modules/Relations/backoffice/components/RelationSelector';
import { MultipleSelections } from '@modules/Relations/backoffice/components/MultipleSelections';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Divider,
  Form,
  Icon,
  Label,
  Modal,
} from 'semantic-ui-react';
import { documentApi } from '@api/documents';

export default class RelationLanguagesModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }

  selectResultRender = (option, disabled) => {
    const description = (
      <>
        <label>languages:</label>{' '}
        <DocumentLanguages languages={option.metadata.languages} />
      </>
    );
    return (
      <DocumentSelectListEntry
        document={option}
        description={description}
        disabled={disabled}
        key={option.metadata.pid}
      />
    );
  };

  render() {
    const { documentDetails, relationType, relations } = this.props;
    const { isLoading } = this.state;
    return (
      <RelationModal
        triggerButtonContent="Add language relations"
        disabled={!documentDetails.metadata.languages}
        disabledContent="Please specify a language for this record before adding a language relation."
        modalHeader={
          <>
            Attach translations <Icon size="large" name="language" />
          </>
        }
        isLoading={isLoading}
        relationType={relationType}
        referrerRecord={documentDetails}
      >
        <Modal.Content>
          <Container textAlign="left">
            Select translations to create the relation.
            <Form>
              <Form.Group>
                <Container className="spaced">
                  <RelationSelector
                    existingRelations={relations.language}
                    optionsQuery={documentApi.list}
                    resultRenderer={this.selectResultRender}
                    referrerRecordPid={documentDetails.metadata.pid}
                  />
                </Container>
              </Form.Group>
            </Form>
          </Container>
          <Container textAlign="center">
            <Divider horizontal> Summary </Divider>
            <RelationSummary
              columnsWidths={{ left: 4, middle: 3, right: 9 }}
              currentReferrer={documentDetails}
              renderSelections={() => <MultipleSelections />}
              relationDescription={
                <>
                  <Icon size="large" name="arrows alternate horizontal" />
                  <br />
                  is a <Label color="blue">translation </Label> of
                </>
              }
            />
          </Container>
        </Modal.Content>
      </RelationModal>
    );
  }
}

RelationLanguagesModal.propTypes = {
  /* relations got from the current document, reducer */
  relations: PropTypes.object.isRequired,
  documentDetails: PropTypes.object.isRequired,
  relationType: PropTypes.string.isRequired,
};
