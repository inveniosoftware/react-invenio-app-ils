import { SeriesAuthors } from '@modules/Series';
import { SeriesSelectListEntry } from '@modules/Series/backoffice';
import {
  RelationModal,
  SingleSelection,
  RelationSummary,
  RelationSelector,
} from '@modules/Relations/backoffice';
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
import { seriesApi } from '@api';

export default class RelationSerialModal extends Component {
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
        description={
          <>
            <SeriesAuthors metadata={option.metadata} />
            {<label>By </label> && option.metadata.publisher} <br />
          </>
        }
        disabled={disabled}
      />
    );
  };

  render() {
    const { disabled, recordDetails, relationType, relations } = this.props;
    const { isLoading, volume } = this.state;
    return (
      <RelationModal
        disabled={disabled}
        modalHeader="Attach document to a serial"
        triggerButtonContent="Add to a serial"
        isLoading={isLoading}
        relationType={relationType}
        referrerRecord={recordDetails}
        extraRelationField={{ field: { volume: volume } }}
      >
        <Modal.Content>
          <Container textAlign="left">
            Select the serial to attach this document to it.
            <Form>
              <Form.Group>
                <Container className="spaced">
                  <RelationSelector
                    mode="single"
                    existingRelations={relations.serial || {}}
                    optionsQuery={seriesApi.serials}
                    resultRenderer={this.selectResultRender}
                    referrerRecordPid={recordDetails.metadata.pid}
                  />
                </Container>
              </Form.Group>
              Provide volume index (optional)
              <br /> <br />
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
              currentReferrer={recordDetails}
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

RelationSerialModal.propTypes = {
  /* relations got from the current document, reducer */
  relations: PropTypes.object.isRequired,
  recordDetails: PropTypes.object.isRequired,
  relationType: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

RelationSerialModal.defaultProps = {
  disabled: false,
};
