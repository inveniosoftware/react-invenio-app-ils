import { documentApi } from '@api';
import { DocumentLanguages } from '@modules/Document';
import { DocumentSelectListEntry } from '@modules/Document/backoffice';
import {
  RelationModal,
  RelationSelector,
  RelationSummary,
  SingleSelection,
} from '@modules/Relations/backoffice';
import _isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  Container,
  Divider,
  Form,
  Icon,
  Input,
  Label,
  Modal,
} from 'semantic-ui-react';

export default class RelationOtherModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      note: undefined,
      isLoading: false,
    };
  }

  selectResultRender = (option, disabled) => {
    const description = (
      <>
        <label>languages:</label>{' '}
        <DocumentLanguages metadata={option.metadata} />
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
    const { disabled, documentDetails, relationType, relations } = this.props;
    const { isLoading, note } = this.state;
    return (
      <RelationModal
        disabled={disabled}
        triggerButtonContent="Add relation"
        modalHeader="Create new relation"
        isLoading={isLoading}
        relationType={relationType}
        referrerRecord={documentDetails}
        extraRelationField={{
          field: {
            note: note,
          },
          options: {
            isValid: !_isEmpty(note),
          },
        }}
      >
        <Modal.Content>
          <Container textAlign="left">
            Select a document to create a new relation.
            <Form>
              <Form.Group>
                <Container className="spaced">
                  <RelationSelector
                    existingRelations={relations.other}
                    mode="single"
                    optionsQuery={documentApi.list}
                    resultRenderer={this.selectResultRender}
                    referrerRecordPid={documentDetails.metadata.pid}
                  />
                </Container>
              </Form.Group>
              Note describing the relation
              <br /> <br />
              <Form.Field required inline key="note">
                <label>Note</label>
                <Input
                  name="note"
                  onChange={(e, { value }) => this.setState({ note: value })}
                />
              </Form.Field>
            </Form>
          </Container>
          <Container textAlign="center">
            <Divider horizontal> Summary </Divider>
            <RelationSummary
              currentReferrer={documentDetails}
              renderSelections={() => <SingleSelection />}
              relationDescription={
                <>
                  <Icon name="arrows alternate horizontal" />
                  <br />
                  is (a) <Label color="blue">{note || '...'} </Label> of
                </>
              }
            />
          </Container>
        </Modal.Content>
      </RelationModal>
    );
  }
}

RelationOtherModal.propTypes = {
  /* relations got from the current document, reducer */
  relations: PropTypes.object.isRequired,
  documentDetails: PropTypes.object.isRequired,
  relationType: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

RelationOtherModal.defaultProps = {
  disabled: false,
};
