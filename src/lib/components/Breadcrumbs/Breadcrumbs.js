import { Truncate } from '@components/Truncate';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb } from 'semantic-ui-react';

export default class Breadcrumbs extends Component {
  constructor(props) {
    super(props);
    this.elements = props.elements;
  }

  _renderBreadcrumbElements = () => {
    return this.elements.map((element, i, arr) => (
      <span key={element.label}>
        <Breadcrumb.Section>
          <Link key={element.to} to={element.to}>
            {element.label}
          </Link>
        </Breadcrumb.Section>
        {i + 1 !== arr.length ? (
          <Breadcrumb.Divider icon="right chevron" />
        ) : (
          <Breadcrumb.Divider icon="right arrow" />
        )}
      </span>
    ));
  };

  render() {
    const { currentElement } = this.props;
    return (
      <div className="breadcrumbs">
        <Breadcrumb>
          {this._renderBreadcrumbElements()}
          <Breadcrumb.Section active>
            <Truncate width="200px">{currentElement}</Truncate>
          </Breadcrumb.Section>
        </Breadcrumb>
      </div>
    );
  }
}

Breadcrumbs.propTypes = {
  elements: PropTypes.array.isRequired,
  currentElement: PropTypes.node,
};

Breadcrumbs.defaultProps = {
  currentElement: null,
};
