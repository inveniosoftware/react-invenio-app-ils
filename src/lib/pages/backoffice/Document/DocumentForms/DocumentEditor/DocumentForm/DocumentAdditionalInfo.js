import React, { Component } from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import { AlternativeAbstracts, AlternativeIdentifiers } from './components';
import Overridable from 'react-overridable';
import { MetadataExtensions } from './components';
import PropTypes from 'prop-types';
import _isEmpty from 'lodash/isEmpty';
import { invenioConfig } from '@config';

export class DocumentAdditionalInfo extends Component {
  render() {
    const { extensions } = this.props;
    return (
      <Grid columns="equal">
        <Grid.Row>
          <Grid.Column width={11}>
            <Grid columns="equal">
              <Grid.Row>
                <Grid.Column>
                  <Segment>
                    <AlternativeIdentifiers />
                  </Segment>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Grid.Column>
          <Grid.Column width={5}>
            <Segment>
              <AlternativeAbstracts />
            </Segment>
          </Grid.Column>
        </Grid.Row>
        {!_isEmpty(extensions) &&
          !_isEmpty(invenioConfig.DOCUMENTS.extensions.fields) && (
            <Grid.Row>
              <Grid.Column>
                <Segment>
                  <Overridable
                    id="DocumentForm.Extensions"
                    extensions={extensions}
                  >
                    <MetadataExtensions extensions={extensions} />
                  </Overridable>
                </Segment>
              </Grid.Column>
            </Grid.Row>
          )}
      </Grid>
    );
  }
}

DocumentAdditionalInfo.propTypes = {
  extensions: PropTypes.object,
};

DocumentAdditionalInfo.defaultProps = {
  extensions: null,
};
