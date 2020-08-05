import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Accordion } from 'semantic-ui-react';

export class MenuBucketAggregationValueElementOverrides extends Component {
  state = { activeIndex: '' };

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };
  render() {
    const { containerCmp, title, agg } = this.props;
    const { activeIndex } = this.state;
    return containerCmp ? (
      <>
        <Accordion.Title
          active={activeIndex === agg.field}
          index={agg.field}
          onClick={this.handleClick}
          content={title}
        />
        <Accordion.Content active={activeIndex === agg.field}>
          {containerCmp}
        </Accordion.Content>
      </>
    ) : null;
  }
}

MenuBucketAggregationValueElementOverrides.propTypes = {
  containerCmp: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
  agg: PropTypes.object.isRequired,
};
