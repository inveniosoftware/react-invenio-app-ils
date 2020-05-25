import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Headline } from './Headline';
import Overridable from 'react-overridable';
import { SectionsWrapper } from './Sections';

const OverridableHome = ({ ...props }) => {
  return (
    <Overridable id="Home.layout" {...props}>
      <>
        <Headline testProp="test" />
        <Overridable id="Home.content">
          <SectionsWrapper />
        </Overridable>
      </>
    </Overridable>
  );
};

class Home extends Component {
  render() {
    return <OverridableHome {...this.props} />;
  }
}

Home.propTypes = {};

export default Overridable.component('Home', Home);
