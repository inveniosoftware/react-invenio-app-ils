import { RelationModal } from '@modules/Relations/backoffice/components/RelationModal';
import { RelationSummary } from '@modules/Relations/backoffice/components/RelationSummary';
import { SingleSelection } from '@modules/Relations/backoffice/components/SingleSelection';
import { RelationSelector } from '@modules/Relations/backoffice/components/RelationSelector';
import SeriesSelectListEntry from '@modules/Series/backoffice/SeriesSelectListEntry';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Divider,
  Form,
  Icon,
  Input,
  Label,
  Modal,
} from 'semantic-ui-react';
import { seriesApi } from '@api/series/series';

export default class RelationMultipartModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      volume: undefined,
      isLoading: false,
    };
  }

  selectResultRender = (option, disabled) => {
    return (
      <SeriesSelectListEntry
        series={option}
        description={option.metadata.publisher}
        disabled={disabled}
      />
    );
  };

  render() {
    const { disabled, documentDetails, relationType, relations } = this.props;
    const { isLoading, volume } = this.state;
    return (
      <RelationModal
        disabled={disabled}
        modalHeader="Attach document to a multipart monograph"
        triggerButtonContent="Attach multipart"
        isLoading={isLoading}
        relationType={relationType}
        referrerRecord={documentDetails}
        extraRelationField={{ field: { volume: volume } }}
      >
        <Modal.Content>
          <Container textAlign="left">
            Select a multipart monograph to attach this document to it.
            <Form>
              <Form.Group>
                <Container className="spaced">
                  <RelationSelector
                    mode="single"
                    existingRelations={relations.multipart_monograph}
                    optionsQuery={seriesApi.multipartMonographs}
                    resultRenderer={this.selectResultRender}
                    referrerRecordPid={documentDetails.metadata.pid}
                  />
                </Container>
              </Form.Group>
              Provide volume index (optional)
              <br />
              <br />
              <Form.Field inline key="volume">
                <label>Volume index</label>
                <Input
                  name="volume"
                  type="number"
                  onChange={(e, { value }) => this.setState({ volume: value })}
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
                  <Icon size="large" name="arrow right" />
                  <br />
                  is{' '}
                  <Label color="blue">
                    volume {volume && <Label.Detail>{volume}</Label.Detail>}{' '}
                  </Label>{' '}
                  of
                </>
              }
            />
          </Container>
        </Modal.Content>
      </RelationModal>
    );
  }
}

RelationMultipartModal.propTypes = {
  /* relations got from the current document, reducer */
  relations: PropTypes.object.isRequired,
  documentDetails: PropTypes.object.isRequired,
  relationType: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
};
