import { seriesApi } from '@api';
import { SeriesLanguages } from '@modules/Series';
import { RelationModal } from '@modules/Relations/backoffice/components/RelationModal';
import { RelationSelector } from '@modules/Relations/backoffice/components/RelationSelector';
import { RelationSummary } from '@modules/Relations/backoffice/components/RelationSummary';
import { SingleSelection } from '@modules/Relations/backoffice/components/SingleSelection';
import SeriesSelectListEntry from '@modules/Series/backoffice/SeriesSelectListEntry/SeriesSelectListEntry';
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
        <SeriesLanguages languages={option.metadata.languages} />
      </>
    );
    return (
      <SeriesSelectListEntry
        series={option}
        description={description}
        disabled={disabled}
        key={option.metadata.pid}
      />
    );
  };

  render() {
    const { disabled, seriesDetails, relationType, relations } = this.props;
    const { isLoading, note } = this.state;
    const fetchOptionsQuery =
      seriesDetails.metadata.mode_of_issuance === 'SERIAL'
        ? seriesApi.serials
        : seriesApi.multipartMonographs;
    return (
      <RelationModal
        disabled={disabled}
        triggerButtonContent="Add relation"
        modalHeader="Create new relation"
        isLoading={isLoading}
        relationType={relationType}
        referrerRecord={seriesDetails}
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
            Select a series to create a new relation.
            <Form>
              <Form.Group>
                <Container className="spaced">
                  <RelationSelector
                    existingRelations={relations.other}
                    mode="single"
                    optionsQuery={fetchOptionsQuery}
                    resultRenderer={this.selectResultRender}
                    referrerRecordPid={seriesDetails.metadata.pid}
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
              currentReferrer={seriesDetails}
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
  /* relations got from the current series, reducer */
  relations: PropTypes.object.isRequired,
  seriesDetails: PropTypes.object.isRequired,
  relationType: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

RelationOtherModal.defaultProps = {
  disabled: false,
};
