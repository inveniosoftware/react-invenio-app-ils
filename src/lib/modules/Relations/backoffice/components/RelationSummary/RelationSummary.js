import DocumentLanguages from '@modules/Document/DocumentLanguages';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { RelationCard } from '@modules/Relations/backoffice/components/RelationCard';
import _isEmpty from 'lodash/isEmpty';
import { Container, Grid, Icon, Label, Message } from 'semantic-ui-react';

export default class RelationSummary extends Component {
  render() {
    const {
      selections,
      currentReferrer,
      renderSelections,
      emptySelectionMessageHeader,
      currentReferrerComponent,
      relationDescription,
      columnsWidths,
    } = this.props;

    return (
      <Container className="spaced">
        <Grid columns={3} verticalAlign="middle">
          <Grid.Column width={columnsWidths.left}>
            {currentReferrerComponent || (
              <RelationCard
                data={currentReferrer}
                extra={
                  <>
                    <Icon size="big" name="language" />
                    <Label size="tiny" className="ml-10">
                      <DocumentLanguages metadata={currentReferrer.metadata} />
                    </Label>
                  </>
                }
              />
            )}
          </Grid.Column>

          <Grid.Column width={columnsWidths.middle}>
            {relationDescription || (
              <>
                <Icon size="large" name="arrows alternate horizontal" />
                <br />
                is a <Label color="blue">related</Label> to
              </>
            )}
          </Grid.Column>

          <Grid.Column width={columnsWidths.right} className="scrolling">
            {_isEmpty(selections) ? (
              <Message
                info
                icon="info circle"
                header={emptySelectionMessageHeader || 'No relations selected'}
                content="Select literature to proceed."
              />
            ) : (
              renderSelections()
            )}
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

RelationSummary.propTypes = {
  selections: PropTypes.array.isRequired,
  currentReferrer: PropTypes.object.isRequired,
  // removeFromSelection: PropTypes.func.isRequired,
  renderSelections: PropTypes.func.isRequired,
  emptySelectionMessageHeader: PropTypes.string,
  currentReferrerComponent: PropTypes.node,
  relationDescription: PropTypes.node,
  columnsWidths: PropTypes.object,
};

RelationSummary.defaultProps = {
  columnsWidths: { left: 6, middle: 4, right: 6 },
  emptySelectionMessageHeader: null,
  currentReferrerComponent: null,
  relationDescription: null,
};
