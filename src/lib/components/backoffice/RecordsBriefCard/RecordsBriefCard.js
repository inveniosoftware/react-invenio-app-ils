import React, { Component } from 'react';
import { Grid, Header, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';

export default class RecordsBriefCard extends Component {
  render() {
    const { title, stats, text, buttonLeft, buttonRight } = this.props;

    return (
      <Segment raised className="brief-card">
        <Header textAlign="right" as="h3">
          {title}
        </Header>
        <p>
          {' '}
          <span data-test={stats}>{stats}</span> {text}
        </p>
        <Grid>
          <Grid.Row columns="equal">
            {buttonLeft ? (
              <Grid.Column key="left">{buttonLeft}</Grid.Column>
            ) : null}
            {buttonRight ? (
              <Grid.Column key="right">{buttonRight}</Grid.Column>
            ) : null}
          </Grid.Row>
        </Grid>
      </Segment>
    );
  }
}

RecordsBriefCard.propTypes = {
  title: PropTypes.string.isRequired,
  stats: PropTypes.number.isRequired,
  text: PropTypes.string,
  buttonLeft: PropTypes.node,
  buttonRight: PropTypes.node,
};

RecordsBriefCard.defaultProps = {
  text: '',
  buttonLeft: null,
  buttonRight: null,
};
