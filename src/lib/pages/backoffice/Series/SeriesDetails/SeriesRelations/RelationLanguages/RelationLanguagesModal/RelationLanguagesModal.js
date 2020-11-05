import { MultipleSelections } from '@modules/Relations/backoffice/components/MultipleSelections';
import { RelationSelector } from '@modules/Relations/backoffice/components/RelationSelector';
import { RelationSummary } from '@modules/Relations/backoffice/components/RelationSummary';
import SeriesSelectListEntry from '@modules/Series/backoffice/SeriesSelectListEntry';
import { SeriesLanguages } from '@modules/Series/SeriesLanguages';
import { RelationModal } from '@modules/Relations/backoffice/components/RelationModal';

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
import { seriesApi } from '@api/series';

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
    const { seriesDetails, relationType, relations } = this.props;
    const { isLoading } = this.state;

    const fetchOptionsQuery =
      seriesDetails.metadata.mode_of_issuance === 'SERIAL'
        ? seriesApi.serials
        : seriesApi.multipartMonographs;
    return (
      <RelationModal
        triggerButtonContent="Add language relations"
        disabled={!seriesDetails.metadata.languages}
        disabledContent="Please specify a language for this record before adding a language relation."
        modalHeader={
          <>
            Attach translations <Icon size="large" name="language" />
          </>
        }
        isLoading={isLoading}
        relationType={relationType}
        referrerRecord={seriesDetails}
      >
        <Modal.Content>
          <Container textAlign="left">
            Select translations to create the relation.
            <Form>
              <Form.Group>
                <Container className="spaced">
                  <RelationSelector
                    existingRelations={relations.language}
                    optionsQuery={fetchOptionsQuery}
                    resultRenderer={this.selectResultRender}
                    referrerRecordPid={seriesDetails.metadata.pid}
                  />
                </Container>
              </Form.Group>
            </Form>
          </Container>
          <Container textAlign="center">
            <Divider horizontal> Summary </Divider>
            <RelationSummary
              columnsWidths={{ left: 4, middle: 3, right: 9 }}
              currentReferrer={seriesDetails}
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
  /* relations got from the current series, reducer */
  relations: PropTypes.object.isRequired,
  seriesDetails: PropTypes.object.isRequired,
  relationType: PropTypes.string.isRequired,
};
