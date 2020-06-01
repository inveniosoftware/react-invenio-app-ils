import { seriesApi } from '@api';
import { SeriesLanguages } from '@modules/Series';
import { RelationModal } from '@modules/Relations/backoffice/components/RelationModal';
import { RelationSelector } from '@modules/Relations/backoffice/components/RelationSelector';
import { RelationSummary } from '@modules/Relations/backoffice/components/RelationSummary';
import { SingleSelection } from '@modules/Relations/backoffice/components/SingleSelection';
import SeriesSelectListEntry from '@modules/Series/backoffice/SeriesSelectListEntry/SeriesSelectListEntry';
import _concat from 'lodash/concat';
import _get from 'lodash/get';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  Container,
  Divider,
  Form,
  Icon,
  Label,
  Modal,
} from 'semantic-ui-react';

export default class RelationOtherModal extends Component {
  constructor(props) {
    super(props);

    this.ORDER_IS_CONTINUED_BY = {
      order: 'is_continued_by',
      label: 'is continued by',
    };

    this.ORDER_CONTINUES = {
      order: 'continues',
      label: 'continues',
    };

    this.state = {
      relationOrder: null,
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

  getSummaryDescription = () => {
    let iconName;
    let label;
    if (this.state.relationOrder === this.ORDER_CONTINUES.order) {
      iconName = 'arrow left';
      label = this.ORDER_CONTINUES.label;
    } else if (this.state.relationOrder === this.ORDER_IS_CONTINUED_BY.order) {
      iconName = 'arrow right';
      label = this.ORDER_IS_CONTINUED_BY.label;
    } else {
      return <></>; // do not return null otherwise a default cmp will be rendered.
    }

    return (
      <>
        <Icon name={iconName} />
        <br /> <Label color="blue">{label}</Label>
      </>
    );
  };

  render() {
    const { disabled, seriesDetails, relations, relationType } = this.props;
    const { isLoading, relationOrder } = this.state;

    const sequenceRelations = _get(relations, relationType, []);
    const existingContinuations = sequenceRelations.filter(
      rel => rel.relation_order === this.ORDER_CONTINUES.order
    );
    const existingPredecessors = sequenceRelations.filter(
      rel => rel.relation_order === this.ORDER_IS_CONTINUED_BY.order
    );

    const existingRelations = _concat(
      existingContinuations,
      existingPredecessors
    );

    return (
      <RelationModal
        disabled={disabled}
        triggerButtonContent="Add sequence relation"
        modalHeader="Add new sequence relation"
        isLoading={isLoading}
        relationType={relationType}
        referrerRecord={seriesDetails}
        extraRelationField={{
          field: {
            relation_order: relationOrder,
          },
          options: {
            isValid: relationOrder !== null,
          },
        }}
      >
        <Modal.Content>
          <Container textAlign="left">
            Select a series below to create a sequence.
            <Form>
              <Form.Group>
                <Container className="spaced">
                  <RelationSelector
                    existingRelations={existingRelations}
                    mode="single"
                    optionsQuery={seriesApi.serials}
                    resultRenderer={this.selectResultRender}
                    referrerRecordPid={seriesDetails.metadata.pid}
                  />
                </Container>
              </Form.Group>
              <br /> <br />
              <Form.Group inline>
                <label>Choose the sequence direction. This series:</label>
                <Form.Radio
                  label={this.ORDER_IS_CONTINUED_BY.label}
                  value={this.ORDER_IS_CONTINUED_BY.order}
                  checked={relationOrder === this.ORDER_IS_CONTINUED_BY.order}
                  onChange={(e, { value }) =>
                    this.setState({
                      relationOrder: value,
                    })
                  }
                />
                <Form.Radio
                  label={this.ORDER_CONTINUES.label}
                  value={this.ORDER_CONTINUES.order}
                  checked={relationOrder === this.ORDER_CONTINUES.order}
                  onChange={(e, { value }) =>
                    this.setState({
                      relationOrder: value,
                    })
                  }
                />
              </Form.Group>
            </Form>
          </Container>
          <Container textAlign="center">
            <Divider horizontal> Summary </Divider>
            <RelationSummary
              currentReferrer={seriesDetails}
              renderSelections={() => <SingleSelection />}
              relationDescription={this.getSummaryDescription()}
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
