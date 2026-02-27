import React, { Component, ReactNode } from 'react';
import { Grid, Header, Segment } from 'semantic-ui-react';

interface RecordsBriefCardProps {
  title: string;
  stats: number;
  text?: string;
  buttonLeft?: ReactNode;
  buttonRight?: ReactNode;
}

export default class RecordsBriefCard extends Component<RecordsBriefCardProps> {
  static defaultProps = {
    text: '',
    buttonLeft: null,
    buttonRight: null,
  };

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
